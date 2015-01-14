---
layout: post
title: 移动Web初级入门
description: "入门移动Web的一些思考"
tags: [移动Web]
image:
  background: witewall_3.png
comments: true
share: true
---

>最好的阅读是输出。 --玉伯

即将开始涉入移动Web了，有点小兴奋也有点小紧张，希望能在未来的团队里带来一些价值。记录一下我现在所认识的移动Web。

## 一些基本名词

初涉移动Web，会有一些基本的名称需要掌握，什么设备像素比呀，移动端Web的内核呀，viewport呀，屏幕的的最小物理单位呀。我已经记录了一些，以后还得继续补充。

- \-  [常见移动Web名词](https://www.zybuluo.com/hacke2/note/45079)

## 关于布局

我们来看看移动端最常见的布局：

<!--more-->

<figure>
	<a href="/images/article/2014-11-10/2.jpg">
		<img src="/images/article/2014-11-10/2.jpg" alt="home" />
	</a>
	<figcaption>上中下三部分布局</figcaption>
</figure>

下面实现上述页面常见移动Web布局三种方法：

* fixed
* absolute
* flexbox

### fixed

对于第一种布局，其实现原理就是header和footer部分都为fixed定位。内容页面可以使用`-webkit-overflow-scrolling:touch`来进行滚动，当然，对于不支持的，也可以使用[iscroll](https://github.com/cubiq/iscroll)来兼容。
fixed布局网上人说坑太多，滚动的时候bug太多，特别是表单元素时弹出输入法会有很多问题，所以不建议使用，以下是一些网上参考的资料：

- \- [移动Web开发实践——解决position:fixed自适应BUG](https://github.com/maxzhang/maxzhang.github.com/issues/11)
- \- [移动端web页面使用position:fixed问题总结](https://github.com/maxzhang/maxzhang.github.com/issues/2)
- \- [移动Web开发，4行代码检测浏览器是否支持position:fixed](https://github.com/maxzhang/maxzhang.github.com/issues/7)

### absolute

和fixed一样，只不过将fixed定位设为绝对定位。设定其left,right等值。下面有一个绝对定位的DEMO。

- \- [绝对定位的DEMO](/demo/mobile/position/absolute.html)

### flexbox

flexbox布局我估计是仿照**flex***布局方式。由于主流移动端都使用的现代浏览器都支持这个CSS3属性。Flexbox布局俗称伸缩布局，它可以简单快速的创建一个具有弹性功能的布局。由于移动多终端的需求，所以首选是flexbox。

- \- [flexbox的DEMO](/demo/mobile/position/flex.html)
- \- [[译]flexbox全揭秘](http://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 图片与文字

### 非背景图片

之前提到的[常见移动Web名词](https://www.zybuluo.com/hacke2/note/45079)，设备像素比：2的高清视网膜技术却会使图片变得模糊，这是为什么呢？

<figure>
	<a href="/images/article/2014-11-10/3.png">
		<img src="/images/article/2014-11-10/3.png" alt="home" />
	</a>
	<figcaption>中密度与超高密度(retina)显示的区别</figcaption>
</figure>

根据计算公式，一个像素点会被拆分成4个小点，显示起来自然模糊了。

解决方案一般有两个：

1.设置`target-densitydpi=device-dpi`，采用按照真实比例来展示，然后进行媒体查询技术如下面代码：

{% highlight css %}
#header {
background:url (medium-density-image.png);
}
@media screen and (- webkit -device-pixel-ratio:1.5) {
/* CSS for high-density screens */
#header { background:url (high-density-image.png);}
}
@media screen and (- webkit -device-pixel-ratio:0.75) {
/* CSS for low-density screens */
#header { background:url (low-density-image.png);}
}
{% endhighlight %}

这样有一个弊端就是：需要为每一种分辨率书写单独的代码。

2. 假如需要100×100的图片，那么从设计稿(宽为640)上截取200×200的大小，但设置还是100*100。宽720的设计稿 ，为了满足显示像素为360的屏幕。这样就可以来只有一份设计稿只写一份代码了。

另外，多张图片的显示可以进行`canvas`的绘制，进行`GPU`渲染。。

### 背景图片

background-size设置为高度，自适应宽度100%，这也是CSS3的属性。

### 文字

px单位

传统PC端常用的px来设置大小。因为他比较稳定和精确。

em单位

浏览器中放大或缩放浏览页面时会存在一个问题，因为字体大小是固定了的。要解决这个问题，我们可以使用“em”单位。
em有如下特点：

1. em的值并不是固定的;
2. em会继承父级元素的字体大小。

rem单位

`rem`是CSS3的属性，和`em`一样，他的值是不固定的。区别在于他参考的是一个根元素的确定值。`em`是相对于其父元素来设置字体大小的，这样就会存在一个问题，进行任何元素设置，都有可能需要知道他父元素的大小，在我们多次使用时，就会带来无法预知的错误风险。而rem是相对于根元素`html`，这样就意味着，我们只需要在根元素确定一个参考值。

在了解了px,em,rem的区别后，我们可以进行如下设置：

{% highlight css %}
html { font-size: 62.5%; } 
body { font-size: 14px; font-size: 1.4rem; }
{% endhighlight %}

我们在写大小的时候通过一些简单的计算就可以了，比如的拿到的设计稿有一一部分为18px的文字，那我们在写代码的时候就可以写：

{% highlight css %}
p : {font-size:18px；font-size:1.8rem}/*(1.8 x 10=18)*/
{% endhighlight %}

## 动画

在移动端不用过多考虑平台端的兼容性，完成动画也是借助CSS3的动画来实现。

在我看来，移动端动画优先选择为以下顺序：

	transition > Animation > js

而且最好使用translate3d强制设备进行`GPU`渲染，但也不能过度使用。
我们可以使用CSS3动画库animate.css玩完成常见的动画。更多关于CSS3动画的可以参考：

- \- [CSS动画简介](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)

## 一些事件

移动端原生的最重要的事件`touch` ：

* touchstart
* touchmove
* touchend
* touchcancel

其中，他们之间触发的先后顺序为：

	touchstart > touchmove > touchend > click

移动端click会延迟300ms，原因是他在等待判断是不是双击。当然，现在的一些框架解决了这个问题：

- \- [fastclick](https://github.com/ftlabs/fastclick)
- \- [tap.js](https://github.com/alexgibson/tap.js)


用这几个事件可以衍生出很多事件，比如左滑右滑，上下滑屏，放大，缩放等。详情可以看指尖上的JS系列。

- \- [指尖下的js ——多触式web前端开发之一：对于Touch的处理](http://www.cnblogs.com/pifoo/archive/2011/05/23/webkit-touch-event-1.html)
- \- [指尖下的js ——多触式web前端开发之二：处理简单手势](http://www.cnblogs.com/pifoo/archive/2011/05/22/webkit-touch-event-2.html)
- \- [指尖下的js —— 多触式web前端开发之三：处理复杂手势](http://www.cnblogs.com/pifoo/archive/2011/05/22/webkit-touch-event-3.html)

现在已经有一些封装了的框架：

- \- [hammer.js](https://github.com/hammerjs/hammer.js)
- \- [touch.js](https://github.com/Clouda-team/touch.code.baidu.com)

当然还有其他移动端专属的事件，比如：

* 触摸事件
* 屏幕旋转事件

我用原生JS模仿了神马搜索搜出美团后的信息轮播：

- \- [移动端访问](http://www.hacke2.cn/works/demo/sm-meituan/)

## 一些框架

移动端有一些较为成熟框架：

- \- [JQuery Mobile](http://jquerymobile.com/)
- \- [JQTouch](http://jqtouch.com/)

一些公司也有自己的框架

- \- [腾讯Pro](https://github.com/AlloyTeam/Pro)
- \- [百度BlendUI](https://github.com/Clouda-team/BlendUI)

但更多公司选择使用一些基础的类库自己封装一些常见的交互，毕竟在移动端上流量真的是寸土必争。比如神马搜索用的是[zepto.js](http://zeptojs.com/)。通过gzip压缩后只有几k，而且风格与JQ一模一样，无学习成本。

当然还有些为工具框架

- \- [iscroll4](http://cubiq.org/iscroll-4)

## 参考资料

* [jtyjty99999收集移动端开发所需要的一些资源与小技巧](https://github.com/jtyjty99999/mobileTech)
* [[译]flexbox全揭秘](http://www.cnblogs.com/lilyimage/p/3682810.html)
* [移动端重构系列3——整体布局](http://www.w3cplus.com/mobile/mobile-terminal-refactoring-mobile-layout.html)
* [移动端webapp开发必备知识](http://www.qianduan.net/mobile-webapp-develop-essential-knowledge.html)
* [CSS3的REM设置字体大小](http://www.w3cplus.com/css3/define-font-size-with-css3-rem)
* [设备像素比devicePixelRatio简单介绍](http://www.zhangxinxu.com/wordpress/2012/08/window-devicepixelratio/)
* [使用CSS3开启GPU硬件加速提升网站动画渲染性能](http://blog.bingo929.com/transform-translate3d-translatez-transition-gpu-hardware-acceleration.html)

**文章来自 [{{ site.url }}]({{ site.url }})**