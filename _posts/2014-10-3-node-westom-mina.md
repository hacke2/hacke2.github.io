---
layout: post
title: 利用Node.js对某智能家居服务器重构
description: "利用Node.js天生NIO特性"
tags: [Mongoose]
image:
  background: witewall_3.png
comments: true
share: true
---

之前负责过一个智能家居项目的开发，外包重庆一家公司的，我们主要开发服务器监控和集群版管理。

移动端和机顶盒的远程通信是用中间服务器完成交互，服务器使用MINA NIO框架，非阻塞式的，可以看看以前博客了解下<a href="http://blog.csdn.net/hacke2/article/details/32188927">某智能家居项目框架学习总结</a>，或者其他资料<a href="http://weixiaolu.iteye.com/blog/1479656">JAVA NIO原理</a>，<a href="http://www.iteye.com/topic/166596">基于MINA框架快速开发网络应用程序</a>。

在移动端或者机顶盒登录后会使用spring security 进行加密，主要是结合用户名和密码来加密，生成一个唯一标示符。服务器来到一个请求时会检查对应的标示符来发送相关约定好的命令，如登录到移动端向服务器发送命名，服务器会生成如522f9e2a459de81d6a9e9eadfa9468d1的标示符，如果在机顶盒集合里也存在相应标示符的主控，则给他发送。

最近关注Node.js，这不就是Node的特性NIO吗？

让我们来着手重构一下，利用Node.js的先天优势，高并发，非阻塞式

<!--more-->

首先对连接封装一下
{% highlight JavaScript %}

var MyClient = function (client, username, password, type){
	this.client = client;
	this.username = username;
	this.password = password;
	this.type = type; //0是机顶盒，1是客户端
}

MyClient.prototype.write = function(msg) {
	this.client.write(msg + '\r\n');
}

module.exports = MyClient;

{% endhighlight %}

每一个连接都有它的用户名和密码，也有它的client，也就是Socket。也有一个标示符，表示是主控还是客户端

然后添加一个原型方法，用来向当前client发送信息

下面就是编写主程序了，使用Node.js进行网络应用程序的开发很简单，详细大家能看懂

{% highlight JavaScript %}
//tcp
var net = require('net');
var crypto = require('crypto');



var MyClient = require('./MyClient');

var server = net.createServer();

//客户端，如平台、移动端进来放在这个数组中
var clientArr = [];
//主控端，主要装的是机顶盒的连接
var boxArr = [];


server.on('connection', function(client){

	
	client.setEncoding('utf-8');
	client.write('plase input name|password|type :\n');

	var myClient; 
	var message = '';
	//发送消息
	client.on('data', function(data){
		//如果是非回车则累加
		if('\r\n' != data || data == '' || data == null) {
			message += data;
		}else {
			//说明是已经注册的client
			if(myClient) {
				sendMsg(message, myClient);
			}else{//说明是第一次进来
				var userInfo = message.split('|');
				var md5 = crypto.createHash('md5');
				//使用用户名和密码进行加密，放入password中
				md5.update(userInfo[0] + userInfo[1]);
				var password = md5.digest('hex');
				myClient = new MyClient(client, userInfo[0], password, +userInfo[2]);
				//如果是客户端
				if(myClient.type) {
					clientArr.push(myClient);
				}else {
					boxArr.push(myClient);
				}
				console.log('新加用户' + password);
			}
			message = '';
		}
		
		
		
	})
	//断开时移除这个客户端
	client.on('end', function(data){
		console.log('end....');
		//有还未登录就退出的情况
		if(myClient) {
			if(myClient.type) {
				clientArr.splice(clientArr.indexOf(myClient), 1)
			}else {
				boxArr.splice(boxArr.indexOf(myClient), 1)
			}
		}
		
	})
})

server.listen(3000);

function sendMsg(msg, myClient) {
	console.log(' sendMsg : ' + msg);
	var array = myClient.type == 1 ? boxArr : clientArr;
	for (var i = 0; i < array.length; i++) {
		if (myClient.password == array[i].password) {
			 array[i].write(msg);
			 console.log(myClient.name + myClient.type == 1 ? '移动端' : '主控' + '发送消息....');
		};
	};
}

console.log('listening....');
{% endhighlight %}

我们来测试一下，利用telnet，使用约定好的协议进行登录，cqut 123456 1,cqut 123456 0,cqut2 123456 1，(这里不是空格，而是I符号，在文章内显示有问题，具体看代码分割就明白了)可以看到，cqut只是给cqut的机顶盒发送，而cqut2的接受不到。

<figure>
	<a href="/images/article/16.jpg">
		<img src="/images/article/16.jpg" alt="home" />
	</a>
	<figcaption>只给对应的设备发，给其他设备不会发送</figcaption>
</figure>

当然Mina还有其强大的过滤器，利用Node.js的中间件就能很好的实现，请读者自行研究

<strong>end from <a href="{{ site.url }}"> {{ site.url }}</a></strong>