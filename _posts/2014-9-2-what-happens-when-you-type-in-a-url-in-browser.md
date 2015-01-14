---
layout: post
title: 从输入 URL 到页面加载完成的过程中都发生了什么事情？
description: "what happens when you type in a url in browser，对stackoverflow回答的扩展"
tags: [浏览器, 计算机网络]
image:
  background: witewall_3.png
comments: true
share: true
---

之前阿里有一个笔试题：在在浏览器输入url发生了什么事请，看到<a href="http://stackoverflow.com/questions/2092527/what-happens-when-you-type-in-a-url-in-browser">Stack Overflow</a>有一个很好的资料,
记录了一下，以后做个参考.

	1.browser checks cache; if requested object is in cache and is fresh, skip to #9
	2.browser asks OS for server's IP address
	3.OS makes a DNS lookup and replies the IP address to the browser
	4.browser opens a TCP connection to server (this step is much more complex with HTTPS)
	5.browser sends the HTTP request through TCP connection
	6.browser receives HTTP response and may close the TCP connection, or reuse it for another request
	7.browser checks if the response is a redirect (3xx result status codes), authorization request (401),
		error (4xx and 5xx), etc.; these are handled differently from normal responses (2xx)
	8.if cacheable, response is stored in cache
	9.browser decodes response (e.g. if it's gzipped)
	10.browser determines what to do with response 
		(e.g. is it a HTML page, is it an image, is it a sound clip?)
	11.browser renders response, or offers a download dialog for unrecognized types

<!--more-->

	1.检查浏览器缓存，如果你请求的对象依据缓存下来了，则跳到第9步
	2.浏览器会询问操作系统你请求的服务器的IP
	3.操作系统先查询本地Host文件；如果hosts里没有这个域名的映射，则查找本地DNS解析器缓存；
		如果还是没有，会找TCP/ip参数中设置的首选DNS服务器，查询本地区域文件与缓存；
		如果本地DNS服务器本地区域文件与缓存解析都失效，则根据本地DNS服务器的设置进行查询，
		如果未用转发模式，本地DNS就把请求发至13台根DNS，
		如果开启转发模式，此DNS服务器就会把请求转发至上一级DNS服务器，由上一级服务器进行解析，
		上一级服务器如果不能解析，或找根DNS或把转请求转至上上级，以此循环。最后返回IP给浏览器
	4.浏览器拿到IP后，想会向服务器建立一个socket连接(不考虑https)
	5.浏览器通过TCP向服务器发送HTTP请求的
	6.浏览器接收到服务器响应就会断开TCP连接，或者为了其他请求重用它
	7.浏览器检查响应的状态是重定向(3xx)、要求授权(401)、服务器错误(4xx 和 5xx)，如果是正常则会返回2xx(200)，
	8.如果是可缓存的，响应则缓存在内存里
	9.浏览器将解码响应(不考虑gzip压缩)
	10.浏览器决定如何响应,例如图片、HTML、媒体文件
	11.浏览器将渲染请求，或者弹出一个下载对话框
	
大家也可以参考下面补充文章:<br/>
<a href="http://ued.ctrip.com/blog/?p=3287">浏览器是怎样工作的（一）：基础知识</a><br/>
<a href="http://ued.ctrip.com/blog/?p=3295">浏览器是怎样工作的：渲染引擎，HTML解析（连载二）</a><br/>
<a href="http://tool.oschina.net/commons?type=5">开源中国HTTP状态码常用对照表</a>

<strong>end</strong>