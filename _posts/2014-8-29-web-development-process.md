---
layout: post
title: 高大上Web前端开发环境
description: "前几天做阿里笔试题，最后一个问题是：在前端开发中，经常会遇到调用后端接口的情况，如果我们不想依赖后台的开发环境，比如：本地搭建熟悉的环境，模拟AJAX，说出你的解决方案
记得我当时是这样答的："
tags: [JavaScript]
image:
  background: witewall_3.png
comments: true
share: true
---
# 起因

前几天做阿里笔试题，最后一个问题是：在前端开发中，经常会遇到调用后端接口的情况，如果我们不想依赖后台的开发环境，比如：本地搭建熟悉的环境，模拟AJAX，说出你的解决方案
记得我当时是这样答的：

<!--more-->

### 若java

	1.使用tomcat环境
	2.使用selvet

{% highlight Java %}
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	resp.getOutputStream().write("{status:'ok',value:'11'}".getBytes("UTF-8"));
	resp.setContentType("text/json; charset=UTF-8");
}
{% endhighlight %}

### 若php

1.使用wamp 环境   
2.后端PHP构造json数据
{% highlight Php %}
echo "{status:'ok',value:'11'}";
//或者
echo json_encode($result);//$result 是数组
{% endhighlight %}


### 若对数据没有动态提取的要求，则直接放大xxx.json里面

json格式为
{'status':'ok','value':'11'}

* 前台使用AJAX请求

{% highlight JavaScript %}
function ajax(url, success, fail){
    // 1. 创建连接
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // 2. 连接服务器
    xhr.open('get', url, true)
    // 3. 发送请求
    xhr.send(null);
    // 4. 接受请求
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else { // fail
                fail && fail(xhr.status);
            }
        }
    }
}
//请求到数据
var url =  'json.php'...其他地址
ajax(url, function(data) {
    data.status
})
{% endhighlight %}

后来自己又想了一下，其实这道题就看你平时前端开发的环境是怎样的，因为我是JAVA出生，所以一想就想到了启动一个tomcat来启动一个服务器，上面开启一个sevlet来输出json数据。
总感觉这样太“重量级”了，在网上查了一查，才知道了阿里真实的意图--。

### 先不说阿里意图是什么，先看看现在高大上的前端开发环境：

* 代码编辑工具
* 断点调试工具
* 版本管理工具
* 代码合并和混搅工具
* 依赖管理工具
* 单元测试工具
* 集成测试工具

<strong>你没看错，这不是后端开发环境，这竟然是前端的开发环境!</strong>

下面，我们就来说说<strong>这些工具有哪些，在JAVA里面对应那些工具</strong>

<!--
##代码编辑工具：Sublime Text、WebStrom、HBuilder

<figure>
	<img src="images/2014-8-29-web-development-process/1.jpg" alt=""></a>
	<figcaption>Sublime Text被称为是最性感的代码编辑器，很多插件，体积也很小</figcaption>
</figure>

<figure>
	<img src="images/2014-8-29-web-development-process/2.jpg" alt=""></a>
	<figcaption>HBuilder是国产的一款基于eclipse的IDE，专门编写HTML5/CSS3/JavaScript等</figcaption>
</figure>

<figure>
	<img src="images/2014-8-29-web-development-process/3.jpg" alt=""></a>
	<figcaption>WebStorm，一款非常流行的IDE，可以看这个方法在哪一个浏览器兼容，拥有众多插件</figcaption>
</figure>


## 断点调试工具： FireBug, chrome Debug

<figure>
	<img src="images/2014-8-29-web-development-process/1.jpg" alt=""></a>
	<figcaption>Sublime Text被称为是最性感的代码编辑器，很多插件，体积也很小</figcaption>
</figure>

<figure>
	<img src="images/2014-8-29-web-development-process/2.jpg" alt=""></a>
	<figcaption>HBuilder是国产的一款基于eclipse的IDE，专门编写HTML5/CSS3/JavaScript等</figcaption>
</figure>

## 版本管理工具：Git

<figure>
	<img src="images/2014-8-29-web-development-process/1.jpg" alt=""></a>
	<figcaption>Sublime Text被称为是最性感的代码编辑器，很多插件，体积也很小</figcaption>
</figure>

## 代码合并和混搅工具：Grunt(基于NodeJS)

<figure>
	<img src="images/2014-8-29-web-development-process/1.jpg" alt=""></a>
	<figcaption>Sublime Text被称为是最性感的代码编辑器，很多插件，体积也很小</figcaption>
</figure>

## 依赖管理工具：bower(基于NodeJS)

<figure>
	<img src="images/2014-8-29-web-development-process/1.jpg" alt=""></a>
	<figcaption>Sublime Text被称为是最性感的代码编辑器，很多插件，体积也很小</figcaption>
</figure>

## 单元测试工具：jasmine(基于NodeJS)

<figure>
	<img src="images/2014-8-29-web-development-process/1.jpg" alt=""></a>
	<figcaption>Sublime Text被称为是最性感的代码编辑器，很多插件，体积也很小</figcaption>
</figure>

## 单元测试工具：jasmine(基于NodeJS)Karma自动化完成单元测试

<figure>
	<img src="images/2014-8-29-web-development-process/1.jpg" alt=""></a>
	<figcaption>Sublime Text被称为是最性感的代码编辑器，很多插件，体积也很小</figcaption>
</figure>
-->
<strong>未完待续...</strong>