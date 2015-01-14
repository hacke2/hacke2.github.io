---
layout: post
title: HTML5和JavaScript Web应用开发读书笔记
description: "《HTML5和JavaScript Web应用开发》主要介绍如何使用HTML5、JavaScript和最新的W3C规范构建可用于所有浏览器和设备的Web应用"
tags: [读书笔记]
image:
  background: witewall_3.png
comments: true
share: true
---

<figure>
	<a href="http://img11.360buyimg.com/n0/g14/M07/17/04/rBEhV1JnaDgIAAAAAAIMoOWOE-gAAEhdAArwQ4AAgy4171.jpg">
		<img src="http://img11.360buyimg.com/n0/g14/M07/17/04/rBEhV1JnaDgIAAAAAAIMoOWOE-gAAEhdAArwQ4AAgy4171.jpg" alt="home" />
	</a>
	<figcaption>HTML5和JavaScript Web应用开发</figcaption>
</figure>

<!--more-->

# 第一章 客户端架构

 * 过去前端开发人员不用关心用户界面后的框架，从未先现在一样关注浏览器的性能
 * 过去利用服务端模板和组件框架，如JAVA 的JSP,Velocity，前端只是套个模板而已
 * 如今浏览器的性能已经得到了很大的提升，很多逻辑在客户端写，而后台仅仅提供Restful风格的接口
 * 我们现在创建的不是网站，而是基于HTML5，CSS3和JavaScript的**可靠地应用程序**
 * 服务端模板引擎已经逐渐被JavaScript模板所取代
 * JavaScript API得到了更多硬件访问的支持，例如Geolocation、Web Workers
 * 应该为当前的项目作出价值的决策，必须建立和维护编写、测试、和调试代码与选择框架的工作流
 * [WEB开发模式已经逐渐在演化](https://github.com/lifesinger/lifesinger.github.com/issues/184)，我们前端是新时代的先锋，抓住这个机会，创建性能强大，可伸缩的应用，利用WEB最新规范将其推进一步，变得更好。

# 第二章 移动WEB

 * 28%会使用移动设备来冲浪，但也有很大一部分人使用IE9以下的浏览器
 * 维基百科 [HTML5引擎对比页面](http://en.wikipedia.org/wiki/Comparison-of-layout_engines_(HTML5))
 * Webkit、Mobile Firefox、OperaMobile
 * [浏览器的市场份额](http://www.netmarketshare.com/browser-market-share.aspx?qprid=0&qpcustomd=1),[最新浏览器HTML5支持](http://caniuse.com)
 * 优雅降级
 * [移动设备模拟器列表](http://www.mobilexweb.com/emulators)

# 第三章 为移动WEB构造程序

 * 移动设备的成功依赖于两个因素：所以平台一致的外观；具有离线能力、UI动画和通过Rest风格或者WebSocket端点读取和发送数据的后端服务
 * 有两个影响：CPU/GPU的速度和互联网速度
 * [移动端的设计模式](http://mobiledesignpatterngallery.com/mobile-patterns.php)
 * 要考虑的事情：硬件加速，内存分配和计算负担，电池的消耗与寿命，使用canvas代替image
 * [常见交互](http://html5e.org/example) 滑动，翻转，旋转transtion,transtform,transtlate.建议使用translate3d, 2d转换不支持GPU加速
 * 使用Chrome查看每秒帧数FPS,查看是否加速用合成渲染边框
 * [读取和缓冲，将AJAX缓冲到localStorage](https://github.com/html5e/slidfast/blob/master/slidfast.js#264) 可存5M
 * IOS使用InnerHTML可能会出问题
 * [网络类型检测与处理](https://github.com/html5e/slidfast/blob/master/slidfast.js#L536)
 * 移动WEB常用于单页，可以平滑的向原生应用过渡，减少了请求次数

## 移动框架
 
 * 对触摸屏设备的优化，确保使用CSS3过渡处理动画
 * 在所有主流平台浏览器上跨平台一致性
 * 使用或封装最新的HTML5 CSS3标准
 * 框架背后的强大开源社区
 * 单页框架：[JQuery Mobile](http://jquerymobile.com), [JQTouch](http://jqtouch.com)
 * 无页面结构框架：[xui](http://xuijs.com)
 * 100%JavaScript驱动：[SenchaTouch](http://www.sencha.com/products/touch), [Wink Tooolkit](http://www.sencha.com/products/touch), [The-M-Project](http://the-m-project.net)

## 移动调试

 * [weinre](http://people.apache.org/~pmuellr/weinre)
 * [Adobe Shadow](http://labs.adobe.com/technologies/shadow)
 * [Opera远程调试](http://www.opera.com/dragonfly/documentation/remote)

# 第四章 桌面WEB

 * 由于AJAX的出现，在后台生成HTML的时代宣告结束
 * 在客户端生成HTML降低了服务器的负载
 * [使用HTML5 + Node.js的例子，比前身快2~10倍](http://venturebeat.com/2011/08/16/linkedin-node)

### 客户端优势

 * 更好的用户体验
 * 网络带宽减少（降低成本）
 * 具有可移植性（离线）

### 服务端优势

 * 更好的安全性
 * 减少客户端的处理开销（移动端电池）
 * 具有可扩展性（方便添加更多服务器）
 * 性能检测可以使用UA或[Modernizr.js](http://modernizr.com)

## 特征检测

 * 原生特征检测一般使用创建一个元素看某一个方法是否存在
 * 使用[Modernizr.js](http://modernizr.com)可能会带来加载时间超过30MS，因为必须在DOM加载之前渲染各个值，
 * 使用[Modernizr.js](http://modernizr.com)不建议在生产环境中使用，但是可以在开发阶段使用它将各个浏览器的兼容性先调试好
 * [FormFactory.js](https://github.com/PaulKinlan/formfactor)可以检测不同类型的的设备,如移动设备版本、电视版本

## UA

 * window.navigator.userAgent检测，但是不可靠
 * Google的一款UA解析器，基于JSON[ua-parser](https://github.com/tobie/ua-parser)，另一款基于JS[platform.js](https://github.com/bestiejs/platform.js)
 * 服务端检测，[MobileESP](http://blog.mobileesp.com)用来检测userAgent的首标

## 压缩

 * 确保之压缩可压缩的内容，不要把资源浪费在可压可不压的内容上
 * 未访问这选择正确的压缩方案
 * 正确配置WEB服务器，将压缩的内容发给具体的有解压能力的客户端
 * 如果一个大型页面(20k ~ 30K)压缩可能会加载CPU的负载，远大于SQL的执行，建议不压身
 * 压缩的目标可以有HTML, CSS, JS, XML, JSON, HTC, TXT(Robots.txt)
 * 可使用GZIP(减少70%，90%浏览器支持)或DEFLATE
 * 压缩JS和CSS的工具有Closure Cpmpiler, Yahoo!YUI Compressor, JSMin, Packer,
 * 前端构建(验证压缩合并等)[grunt](https://github.com/gruntjs/grunt), [Jawr](http://jawr.java.net), [Ziproxy](http://ziproxy.sourceforge.net)

## JavaScript MVC框架

 * [常见MV*框架的演示程序 TodoMVC](https://github.com/tastejs/todomvc)
 * [Backbone](https://github.com/jashkenas/backbone) [书中的例子](https://github.com/html5e/backbone-jax-cellar)
 * [Ember](https://github.com/emberjs/ember.js) [书中的例子](https://github.com/html5e/ember_data_example)
 * [Angular](https://github.com/angular/angular.js) [AngularJS译本](https://github.com/peiransun/angularjs-cn) [书中的例子](https://github.com/html5e/angular-phonecat-mongodb-rest)
 * [Batman](https://github.com/batmanjs/batman) [书中的例子](https://github.com/html5e/batmanjs-address-book)
 * [Knockout](https://github.com/knockout/knockout) [书中的例子](https://github.com/html5e/knockout-rest)

# 第五章 WebSocket

 * 从浏览器发出请求包含了header，无压缩的header可能有200b~2kb之前
 * WebSocket通过套接字的全双工同学，是客户端和服务器通信的高效手段
 * 优雅降级是指在WebSocket不受支持时退回到就技术(Flash或长轮训)
 * NIO和线程直接的争论永无止境，一般的，高并发建议NIO，对计算有很大要求的用多线程
 * 观察者模式，一般的有三个事件，OPEN, MESSSAGE, CLOSE
 * [使用Jetty服务器实现WebSocket的例子](https://github.com/html5e/HTML5-Mobile-WebSocket)
 * 不仅可以传递文本，JSON，而且可以传递二进制，用老发送流式音频，也可以提供画布（你画我猜）与实时的屏幕共享技术
 * 使用代理技术如HAProxy让拆除服务器又不影响新的服务

### 优势

 * 没有HTTP Header
 * 没有持续(Keep-alive)问题引起的时滞
 * 低延时，更好地吞吐量和相应能力
 * 对移动设备的电池有利

## 框架

 * [Ver.x](https://github.com/vert-x/vert.x)是一个全异步，通用的JVM语言应用容器，是JVM版的Node.js
 * [Socket.io](http://socket.io)目标是在每种浏览器和移动设备实现应用，优雅降级
 * [Atmosphere](https://github.com/Atmosphere)可运行在任何基于JAVA的WEB框架
 
# 第六章 Web Storage

 * Cookie只有4K的存储量，而且每次都会带在HTTP请求头，与服务器共享
 * Web Storage有5M，但是存储数据若为UTF-16只有2.6M，IE和Firefox除外
 * Web Storage分为localStorage和sessionStorage(关闭浏览器或标签会消失)
 * 读取或存储数据，是阻塞式的
 * 常用API:length;key(n);getItem(key);setItem(key, value);removeItem(key);clear();
 * [使用localStorage[name] = 'hacke2',localStorage.name = 'hacke2', localStorage.setItem('name', 'hacke2')效率不同](http://jsperf.com/localstorage-key-vs-localstorage-key-vs-localstorage-ge)
 * 同步问题使用StorageEventAPI解决
 * 使用JSON在Web Storage上要进行编码和解码
 * 无安全性可言
 * 浏览器隐私模式下存储会出现异常
 * 使用场景，存储一些Base64的图片，用户搜索的一些数据(神马搜索)等，QQ空间、Disqus评论将草稿存储在loaclStorage,自动登录，[带有时间戳的缓存](https://github.com/pamelafox/lscache)等
 * [从客户端缓冲数据 允许离线且连接到网络时刷新数据](http://engineering.linkedin.com/mobile/linkedin-ipad-using-local-storage-snappy-mobile-apps)
 * [用Backbone进行数据库同步](http://blog.oxfordcc.co.uk/backbone-local-storage-and-server-synchronization)
 * [在任何浏览器中使用Web Storage](https://github.com/wojodesign/local-storage-js)

## 框架

 * [LawnChair](https://github.com/brianleroux/lawnchair)轻量级支持移动设备
 * [persistence.js](https://github.com/coresmart/persistencejs)用于服务端，集成Node.js和MySQL

# 第七章 Geolocation

 * 提供对于宿主设备相关的地理位置信息的脚本访问，定位用户移动时跟踪器经纬度
 * 地理防护：进入或离开一个位置进行提醒
 * 地址匹配：利用Google将经纬度转为实际地址
 * 一般跟踪：跟踪汽车，走路，跑步的距离
 * navigator.geolocation.getCurrentPosition(function(){})
 * [防止激活Geolocation的一个变通方法](http://html5e.org/example/geo)
 * 实例：用户跟踪，反向地址匹配
 * [Geolocation API跨浏览器支持](http://bit.ly/Geolocation-API-Polyfill)

## 框架

 * [geo-loaction-javascript](code.google.com/p/geo-location-javascript)
 * [Webshims lib](https://github.com/aFarkas/webshim)

# 第八章 Device Orientation API

 * 加速度计，陀螺仪，指南针
 * [实例：用设备的移动完成滚动](http://www.html5e.org/example/orientation)

# 第九章 Web Workers

 * 当WEB应用需要在JavaScript进行繁重的工作和后台处理的时候，推荐使用
 * [Web Worker API检测](http://html5-shims.googlecode.com/svn/trunk/demo/workers.html)
 * [Web Worker 性能测试](http://html5-demos.appspot.com/staic/workers/transferables/index.html)
 * [实例：池化和并行作业](http://html5e.org/example/workers) [对应的演示程序](https://github.com/html5e/slidfast/blob/master/example/workers/index.html)
 * [实例：处理图像](http://www.smartjava.org/examples/webworkers2)

**end from [{{ site.url }}]({{ site.url }})**