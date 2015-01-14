---
layout: post
title: 带层次感的图片轮播
description: "带层次感的图片轮播,JavaScript小练习"
tags: [JavaScript, 小练习]
image:
  background: witewall_3.png
comments: true
share: true
---

# 起因

豪哥的JS练习又一波来袭~今天又写了个百度爱玩的东西，暂且叫他带层次感的图片轮播吧


<figure>
	<a href="/images/article/level-img-change/1.jpg">
		<img src="/images/article/level-img-change/1.jpg" alt="home" />
	</a>
	<figcaption>图片可以很有层次感的切换</figcaption>
</figure>

<!--more-->

# 思路

主要思路有二

## 图片大小、位置的计算

我的思路是这样的：

因为首尾切换，我想到的就是自己封装一个循环队列

{% highlight JavaScript %}
//封装一个循环队列
function CircularQueue(arr) {
	this.arr = arr || [];
}

//移除前一个，追加到最后
CircularQueue.prototype.shift = function() {
		var temp = this.arr.shift();
		this.arr.push(temp);
	}
//移除最后一个，追加到头部
CircularQueue.prototype.unshift = function() {
		var temp = this.arr.pop();
		this.arr.unshift(temp);
	}
//添加一个元素
CircularQueue.prototype.add = function(obj) {
	this.arr.push(obj);
}
{% endhighlight %}

现在一个数组里缓存下初始位置的大小，

{% highlight JavaScript %}
//初始化ARR数组
var queue = new CircularQueue();
for (var i = 0; i < li.length; i++) {

	queue.add({
		top: parseInt(getStyle(li[i], 'top')),
		left: parseInt(getStyle(li[i], 'left')),
		width: parseInt(getStyle(li[i], 'width')),
		height: parseInt(getStyle(li[i], 'height')),
		zIndex: getStyle(li[i], 'z-index')
	});
}
{% endhighlight %}

然后在每一个选择项加上mouseover事件，来切换以上图片。

{% highlight JavaScript %}
//绑定事件
for (var j = 0; j < links.length; j++) {
	links[j].onmouseover = (function(j, len) {
		return function() {
			//鼠标一上去小点切换
			var k = len - 1;
			for (; k >= 0; k--) {
				links[k].className = 'dot';
			}
			links[j].className += ' dot-active';

			//替换大图片
			var arr = getMiddleArr(j);
			updateStyle(arr);

		}
	})(j, links.length);
}
{% endhighlight %}

然后通过传入一个数值，得到以改数组为中心的新数组。
因为不能打乱以前的数组，所以我用了深克隆

{% highlight JavaScript %}
//深克隆
Object.prototype.clones = function() {
	var o = {};
	for (var i in this) {
		o[i] = this[i];
	}
	return o;
};
Array.prototype.clones = function() {
	var arr = [];
	for (var i = 0; i < this.length; i++)
		if (typeof this[i] !== 'object') {
			arr.push(this[i]);
		} else {
			arr.push(this[i].clones());
		}
	return arr;
};
{% endhighlight %}



## 缓冲运动

还是用的智联社的运动库，最后将页面元素的样式更新

{% highlight JavaScript %}
//调用动作函数绘制
function updateStyle(arr) {
	for (var i = 0; i < li.length; i++) {
		li[i].style.zIndex = arr[i].zIndex;
		startMove(li[i], arr[i]);

	}
}
{% endhighlight %}


# 代码

全部代码就不贴在博客上了，很简单，没什么可看的，大家可以去我的github上检出


<a target="_blank"  href="https://github.com/hacke2">点击进入我的github</a><br/>

## <a target="_blank"  style="color:red" href="/works/demo/06/" >查看完整DEMO</a>

<strong>end from {{ site.url }}</strong>