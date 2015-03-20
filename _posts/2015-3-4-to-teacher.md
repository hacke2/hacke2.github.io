---
layout: post
title: 给老师的一些课程主题
description: "前端课程的参考主题"
tags: [翻译]
image:
  background: witewall_3.png
comments: true
share: true
---


>我们实验室有一门内部课程，专门讲前端开发，每年的主题都不一样，今年老师让我们建议几个，我罗列了一下几个主题供老师参考：

### 1. 前端工程化

前端工程化是将代码、资源（图片等）的压缩、合并、检错等一些列使用程序来自动完成。有了它可以大大提高开发效率。目前比较流行的国外有grunt，gulp等，国内有fis等，建议讲课时可以讲讲主流前端工程化工具的使用和思考如果将至融入实验室工作的开发流程。

### 2. 前后端分离的思考

以前前端后端开发分离不够，如修改jsp模板前端需要和后端协调，一些数据协议要沟通，一些代码逻辑不能复用（如前后端的数据校验）。支付宝提出使用Node.js在前端和后端中间再加一层，首屏交给Node.js来渲染，二次请求可以通过ajax动态调用。详情可以参照淘宝UED[《前后端分离的思考与实践》](http://ued.taobao.org/blog/2014/04/full-stack-development-with-nodejs/)
一个趋势，大家可以一起学习一下，可以进行头脑风暴。（但实验室这种开发模式是一个人前后端都做，所以没有沟通的成本，但很难在某一领域专一）

<!--more-->

### 3. CSS3动画

现在CSS3新起，动画也有以前的Flash慢慢过渡到用CSS3来实现。使用动画让活动页内容更加丰富活泼，讲的时候建议讲讲重要api及综合案例。参考：

* 黄薇 [《Web高性能动画》](http://melonhuang.github.io/sharing/slides.html?file=high_performance_animation#/)
* [奇舞团《CSS动画使用技巧》](http://www.75team.com/archives/793)
* Webrebuild [《CSS3 动画》](http://daxue.qq.com/content/content/id/1676)

### 4. ECMA Script 6 AND IO.js

ES6将是今年的趋势，这次草案规范了Javascript的类、模块化、Promise、Genertor等重要API，IO.JS作为Node.js的分支，默认开启了ES6，服务端JS是必不可少的

### 5. MVC and MVVM in JavaScript

随着SPA应用的增多，大型前端网页的代码组织不再是简单的JQuery对元素进行操作，而是引入了以Backbone.js代表的MVC框架，以Angular.js代码的MVVM框架。建议实验室同学一起学习学习这些框架的理念。

### 6. Native App VS Web App

本地APP和WEB APP一直孰好孰坏而争吵，可以谈谈两类开发的优劣。另外facebook最新一版使用React.js开发Native App，也以为这JS工程师在无学习成本转向Native App，也可以给大家分享分享React.js

### 7. Web Components

传统的组件开发方式必须要引一堆HTML,CSS,JS，而Web Components提出只是使用简单自定义标签就可以代替传统开发模式，加快了开发的速度，减少了复制时的错误率，这是未来的开发方向，建议做一些DEMO与大家分享。

### 8. Canvas & SVG

随着HTML5新起，Canvas & SVG就尤为重要了，他们可以做游戏、数据可视化等强大的功能。建议讲的时候将一些重要API和DEMO。



**文章来自 [{{ site.url }}]({{ site.url }})**