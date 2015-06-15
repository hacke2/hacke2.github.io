---
layout: post
title: CSS居中完全解决方案
description: "各种情景下的CSS水平垂直居中"
tags: [CSS]
image:
  background: witewall_3.png
comments: true
share: true
---

>上次面试面试官问到了，问了个定宽局中和不定宽局中，下来我把所有有关CSS居中都总结了一下


# 水平居中

## 行内元素

把行内元素嵌套在一个DIV中，并且在DIV中设置以下样式

{% highlight CSS %}
	a{
		text-align: center;
	}
{% endhighlight %}

## 块级元素

对于定宽的块级元素，我们要设置起margin-top,margin-right 为auto

{% highlight CSS %}
	.center{
		margin: 0 auto;
	}
{% endhighlight %}

## 多个块级元素(inline-block)

多个块级元素，我们将其display设置为inline-block；然后将父级元素设置一下属性

<!--more-->

{% highlight CSS %}
	div{
		text-align: center;
	}
{% endhighlight %}

## 多个块级元素(flex)

设置需要水平居中的块状元素的父元素display为flex ，并且justify-content属性为center即可

{% highlight CSS %}
	body{
	  display: flex;
	  justify-content: center;
	}
{% endhighlight %}

# 垂直居中

## 单行 行内元素

将行内元素的height和line-height设置为一致即可

{% highlight CSS %}
	a{
	  height: 200px;
	  line-height:200px;  
	}
{% endhighlight %}

## 多行 行内元素

如果行内元素文字过多产生多行，则在父级元素设置display: table-cell;vertical-align:middle;

{% highlight CSS %}
	.container{
		width: 300px;
		height: 300px;
		display: table-cell;
		vertical-align:middle;
	}
{% endhighlight %}

## 已知高度的块级元素

将块级元素设置绝对定位，top为50%，margin-top:-height/2

{% highlight CSS %}
	div{
	  height: 100px;
	  position: absolute;
	  top: 50%;
	  margin-top: -50px;
	  padding:0; 
	}
{% endhighlight %}

## 未知高度的块级元素

使用CSS translate,将块级元素设置绝对定位，top为50%，transform: translateY(-50%);

{% highlight CSS %}
	div{
	  position: absolute;
	  top: 50%;
	  -webkit-transform:translateY(-50%);
	  -moz-transform:translateY(-50%);
	  transform: translateY(-50%);
	  padding:0; 
	}
{% endhighlight %}

# 水平垂直居中

## 已知高度、宽度的元素

将块级元素设置绝对定位，top为50%，left:50%;margin-top:-height/2;margin-left:-width/2

{% highlight CSS %}
	div{
		width: 150px;
		height: 150px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -75px;
		margin-left: -75px;
	}
{% endhighlight %}

## 已知高度、宽度的元素(flex)

给父级使用flex布局

{% highlight CSS %}
	div{
		display: flex;
		justify-content:center;
		align-items: center;
	}
{% endhighlight %}

## 未知高度、宽度的元素

使用CSS translate

{% highlight CSS %}
	div{
	    position:absolute;
		top:50%;
		left:50%;
		-webkit-transform:translate(-50%,-50%);
		-moz-transform:translate(-50%,-50%);
		transform:translate(-50%,-50%);
	}
{% endhighlight %}



<strong>end from{{ site.url }}</strong>