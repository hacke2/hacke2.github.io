---
layout: post
title: 基于Node.js + socket.io实现WebSocket的聊天DEMO
description: "WebSocket Node.js实现版"
tags: [JavaScript, Node.js]
image:
  background: witewall_3.png
comments: true
share: true
---

# 简介

最近看Node.js和HTML5，练手了一个简易版的聊天DEMO，娱乐一下

## 为什么需要socket.io？

node.js提供了高效的服务端运行环境，但是由于浏览器端对HTML5的支持不一，
为了兼容所有浏览器，提供卓越的实时的用户体验，并且为程序员提供客户端与服务端一致的编程体验，
于是socket.io诞生。

	简答来说socket.io具体以下特点：
	
    1.socket.io设计的目标是支持任何的浏览器，任何Mobile设备。目前支持主流的PC浏览器 (IE,Safari,Chrome,Firefox,Opera等)，Mobile浏览器(iphone Safari/ipad Safari/android WebKit/WebOS WebKit等)。socket.io基于node.js并简化了WebSocket API，统一了通信的API。它支持：WebSocket, Flash Socket, AJAX long-polling, AJAX multipart streaming, Forever IFrame, JSONP polling。
    
    2.socket.io解决了实时的通信问题，并统一了服务端与客户端的编程方式。启动了socket以后，就像建立了一条客户端与服务端的管道，两边可以互通有无。


<!--more-->

# 代码

创建app.js 源码如下

{% highlight JavaScript %}
var fs = require('fs')	//文件操作
    , http = require('http')	//http服务器
    , socketio = require('socket.io');	//socket.io，用来和前台进行交互
  
var server = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html'});
    //将index.html输出
    res.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(3000, function() {
    console.log('Listening at: http://localhost:3000');
});

//连接成功的回调  
socketio.listen(server).on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('接受到 ', msg);
        //将信息发送给其他客户端
        socket.broadcast.emit('message', msg);
    });
});
{% endhighlight %}

创建index.html

{% highlight HTML %}
<html>
<head>
	<meta charset="utf-8">
    <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        $(function(){
            var iosocket = io.connect();
  
            iosocket.on('connect', function () {
                $('#incomingChatMessages').append($('<li>已连接！</li>'));
  
                iosocket.on('message', function(message) {
                    $('#incomingChatMessages').append($('<li></li>').text(message));
                });
                iosocket.on('disconnect', function() {
                    $('#incomingChatMessages').append('<li>失去连接</li>');
                });
            });
  
            $('#outgoingChatMessage').keypress(function(event) {
                if(event.which == 13) {
                    event.preventDefault();
                    iosocket.send($('#outgoingChatMessage').val());
                    $('#incomingChatMessages').append($('<li></li>').text($('#outgoingChatMessage').val()));
                    $('#outgoingChatMessage').val('');
                }
            });
        });
    </script>
</head>
<body>
控制台:&nbsp;<ul id="incomingChatMessages"></ul>
<br />
<input type="text" id="outgoingChatMessage">
</body>
</html>

{% endhighlight %}

# 运行&结果

因为依赖了socket.io包，所以用npm 下载

npm install socket.io

最后直接运行

node app.js

<figure>
	<a href="/images/article/1.jpg">
		<img src="/images/article/1.jpg" alt="home" />
	</a>
	<figcaption>运行效果</figcaption>
</figure>


>附上一个实现了很炫聊天DEMO  http://segmentfault.com/a/1190000000479518

<figure>
	<a href="/images/article/2.png">
		<img src="/images/article/2.png" alt="home" />
	</a>
	<figcaption>聊天DEMO</figcaption>
</figure>

<strong>end from <a href="{{ site.url }}"> {{ site.url }}</a></strong>