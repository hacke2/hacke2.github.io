---
layout: post
title: Zepto CSS方法一个奇怪的现象
description: "Zepto CSS方法一个奇怪的现象"
tags: [心声]
image:
  background: witewall_3.png
comments: true
share: true
---

今天写活动页，打算封装一个JS逐帧运动的组件，但在调试的时候发现使用以下代码会出现问题：

{% highlight JavaScript %}
curAnim.css({
    'background-position' : '-' + i * 75 + 'px 0px'
})
{% endhighlight %}

<!--more-->

在Chrome 模拟器下没任何问题，但是在iphone6下会出现一闪一闪的问题，百思不得其解，后来用JS原生方法解决了。

{% highlight JavaScript %}
curAnim[0].style.backgroundPosition = "-" + i * 75 + "px 0px";
{% endhighlight %}

在iphone6也正常了。

查阅了以下Zetop的css方法，其核心代码如下：

{% highlight JavaScript %}
var css = ''
if (type(property) == 'string') {
if (!value && value !== 0)
  this.each(function(){ this.style.removeProperty(dasherize(property)) })
else
  css = dasherize(property) + ":" + maybeAddPx(property, value)
} else {
for (key in property)
  if (!property[key] && property[key] !== 0)
    this.each(function(){ this.style.removeProperty(dasherize(key)) })
  else
    css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
}

return this.each(function(){ this.style.cssText += ';' + css })
{% endhighlight %}

我上一句其实正在起作用的是下面：

{% highlight JavaScript %}
this.style.cssText += ';' + css;
{% endhighlight %}

于是我想，是不是`this.style.cssText`和`this.style.backgroundPosition`的区别？于是了然了：**cssText因为重新这设置了这个元素样式的会让浏览器将这个元素的整个都repaint+reflow，效率当然要比之变换一个样式的低**，算是分析完了，若对一个元素多次操作还是使用原生JS为妙。

**文章来自 [{{ site.url }}]({{ site.url }})**