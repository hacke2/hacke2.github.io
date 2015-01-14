---
layout: post
title: JavaScript实现联想校招员工信息展示
description: "使用简单模板+css3+javascript实现CSS3弹窗及切换"
tags: [JavaScript, 小练习]
image:
  background: witewall_3.png
comments: true
share: true
---

# 起因

今天和豪哥聊天，才知道他是我老乡，而且特别近。。真的感觉他是我的贵人，这是他从
联想校招扣出来的，我们就用JavaScript来实现吧


<figure>
	<a href="/images/article/4.jpg">
		<img src="/images/article/4.jpg" alt="home" />
	</a>
	<figcaption>联想校招员工信息展示</figcaption>
</figure>

<figure>
	<a href="/images/article/3.jpg">
		<img src="/images/article/3.jpg" alt="home" />
	</a>
	<figcaption>点击弹出详细信息</figcaption>
</figure>

<!--more-->

# 过程

给的有HTML还有CSS3，我打算先用前端模板技术讲信息都出来，之前数据是写死在HTML

数据封装在data.js里

{% highlight JavaScript %}
var data = [];

data.push({
	'name' : 'Dillon',
	'enname' : 'Dillon',
	'desc' : '来自哈佛的战略伙伴经理',
	'pic' : 'images/n8_10.png',
	'bigpic' : 'images/j2.jpg'
});

data.push({
	'name' : '成俞晟',
	'enname' : 'cheng',
	'desc' : '技术宅服务器工程师',
	'pic' : 'images/n8_07.png',
	'bigpic' : 'images/j3.jpg'
});

data.push({
	'name' : 'Said',
	'enname' : 'Said',
	'desc' : '开朗健谈的中国通',
	'pic' : 'images/n8_18.png',
	'bigpic' : 'images/j5.jpg'
});

//...
{% endhighlight %}


我们讲以前的HTML写成一个模板

展示区模板

{% highlight HTML %}
<div id="temp_li" style="display: none;">
	<li data-id="{i}" class="transform">
		<div>
			<i></i>
			<span>{name}</span>
			<p>{desc}</p>
		</div>
		<img src="{pic}">
	</li>
</div>
{% endhighlight %}

弹出层模板

{% highlight HTML %}
<div id="dialog"  class="box_ovo ">
	<span id="close" class="close"><i></i></span>
	<span class="prev"><i></i></span>
	<span class="next"><i></i></span>
	<div id="div_temp1" data-id="{i}" >
		<img class="oimg1" src="{bigpic}">
		<div class="ovotxt">
			<div class="ovohead">
				<h1>{name}</h1>
				<i>{enname}</i>
				<em>{desc}</em>
				<span>ECS</span>
			</div>
			<p>2013年加入联想，联想游戏中心最霸气的女商务，性格大大咧咧，柔弱的外表下有一颗强大的心。自诩内可安邦定天下，外可御敌千里外。</p>
			<p>联想游戏中心作为北研最靓丽的风景线，不仅有着最潮、最流行的游戏可以玩，有各种精美的游戏周边随便拿，最关键的是有这样娇(ba)媚(qi)可(shi)人(zu)的女汉子陪聊，陪工作，陪吃饭。总之一句话，联想游戏中心，你值得拥有。</p>
		</div>
	</div>
</div>
{% endhighlight %}


然后用一下代码弄到HTML里面
{% highlight JavaScript %}
//获取LI模板HTML
var tempLi = document.getElementById('temp_li').innerHTML;
//HTML + 数据最后放到这个数组里
var liArr = [];
for (var i = 0; i < data.length; i++) {
	//替换模板里{}表达式
	var itemLi = tempLi.replace(/\{i\}/, i)
					.replace(/\{name\}/,data[i].name)
					.replace(/\{desc\}/,data[i].desc)
					.replace(/\{pic\}/,data[i].pic);
	liArr.push(itemLi);
} 

//加入到ul里
ul.innerHTML = liArr.join('');


//获取详细信息模板
var tempDialog = dialog.innerHTML;

//打开弹出层
function openDialog(dataIndex) {
	dialog.innerHTML = tempDialog.replace(/\{i\}/,dataIndex)
						.replace(/\{name\}/,data[dataIndex].name)
						.replace(/\{enname\}/,data[dataIndex].enname)
						.replace(/\{desc\}/,data[dataIndex].desc)
						.replace(/\{bigpic\}/,data[dataIndex].bigpic);
	bg.className += ' current';
    dialog.className += ' current';
}
{% endhighlight %}

因为HTML是动态生成的，直接不能加绑定事件，所以使用事件委托

{% highlight JavaScript %}
//给每一个li加事件
ul.onclick = function(event) {
	var e = event || window.event;
	var target = e.target || e.srcElement;
	target = getLiByChild(target);
	if(target) {
		var curIndex = target.getAttribute('data-id');
    	openDialog(curIndex);
	}
}	

//给弹出层加事件
dialog.onclick = function(){
	var e = event || window.event;
	var target = e.target || e.srcElement;
	var curIndex = +dialog.lastElementChild.getAttribute('data-id'); 
	//点击关闭
	if(target.nodeName == 'I' && target.parentNode.className == 'close') {
		closeDialog();
	}
	//点击上一个
	if(target.nodeName == 'I' && target.parentNode.className == 'prev') {
		var preIndex= curIndex-1;
		if(preIndex > -1) {
			closeDialog(function() {
				openDialog(preIndex);
			});
		}else {//否则循环到最后一个
			closeDialog(function() {
				openDialog(data.length-1);
			});
		}
		
	}
	
	//点击下一个
	if(target.nodeName == 'I' && target.parentNode.className == 'next') {
		var nextIndex= curIndex+1;
		if(nextIndex < data.length) {
			closeDialog(function() {
				openDialog(nextIndex);
			});
		}else {//否则循环到最后一个
			closeDialog(function() {
				openDialog(0);
			});
		}
	}
    
}
{% endhighlight %}

其中，弹出层里有三个动作；

1.关闭弹窗
2.前一个
2.后一个

我们在里面做处理，如果是前一个为第一个则跳到最后一个，如果为最后一个则跳到前一个

因为我们点击的时候有可能点到SPAN，有可能点到DIV(原因看展示区模板)，所以要有个函数来
找到顶层的LI,因为关闭有一个动画效果，我看了CSS是0.3s，所以我们加一个定时器做一个回调

{% highlight JavaScript %}
//找到最顶层LI
function getLiByChild(element) {
	var li = element;
	while(li.nodeName != 'LI') {
		li = li.parentNode;
	}
	return li;
}

//关闭Dialog
function closeDialog(func) {
	bg.className = 'box_bg1';
    dialog.className = 'box_ovo';
    setTimeout(function(){
    	if(dialog.className == 'box_ovo') {
    		func && func();
    	}
    },300);
}
{% endhighlight %}

# <a target="_blank"  href="https://github.com/hacke2/">获取代码</a><br/>

代码就不贴在博客上了，很简单，没什么可看的，大家可以去我的github上检出

## <a target="_blank"  style="color:red" href="/works/demo/04" >查看完整DEMO</a>

<strong>end from{{ site.url }}</strong>