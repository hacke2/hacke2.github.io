---
layout: post
title: 小tip:CSS3控制多行溢出
description: "打破CSS只能控制单行溢出的历史观点"
tags: [CSS3]
image:
  background: witewall_3.png
comments: true
share: true
---

>以前做项目，对文字溢出只能进行单行溢出的控制：

{% highlight CSS %}
white-space: nowrap;  
overflow: hidden;  
text-overflow: ellipsis;  
{% endhighlight %}

对于多行则无能为力，只能用渲染端来控制，这样有一个很大的问题：**无法达到响应式**

但是在WebKit浏览器或移动端（绝大部分是WebKit内核的浏览器）的页面实现比较简单，可以直接使用WebKit的CSS扩展属性(WebKit是私有属性)-webkit-line-clamp，这个历史问题也就不攻自破了,对应代码：

<!--more-->

{% highlight CSS %}
@media all and (-webkit-transform-3d){
    .3-line{
       white-space:normal;  
       -webkit-line-clamp:3;  //表限制三行
       display:-webkit-box;  
       overflow: hidden;
       text-overflow:ellipsis;
       -webkit-box-orient: vertical; 
    }
}
{% endhighlight %}

对应SCSS代码如下：

{% highlight SCSS %}
/**
  * multi lines overflow
  * @param {Number} $lineCount - count to display
  */
@mixin multiline-ellipsis($lineCount){
    @media all and (-webkit-transform-3d){
        &{
           white-space:normal;  
           -webkit-line-clamp:$lineCount;  
           display:-webkit-box;  
           overflow: hidden;
           text-overflow:ellipsis;
           -webkit-box-orient: vertical; 
        }
    }
}
{% endhighlight %}


加这段媒体查询的原因是考虑只在webkit下用。直接引用这个代码片段传入参数即可。

对于过渡方案，有以下几种：

1.使用伪元素生成一个“...”（最好半透明背景），父元素定高`overflow:hidden`

2.以上功能由JS来代替[Clamp.js](https://github.com/josephschmitt/Clamp.js)


**文章来自 [{{ site.url }}]({{ site.url }})**