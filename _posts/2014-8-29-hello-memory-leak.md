---
layout: post
title: JavaScript内存泄漏
description: "进入WEB 2.0 时代，js人们对Web应用有了高更的要求.一个页面很可能数小时不会发生URL跳转，并同时通过Web服务动态的更新页面内容.复杂的事件关联设计、基于对象的JScript和DHTML技术的广泛采用，使得代码的能力达到了其承受的极限.在这样的情况和改变下，弄清楚内存泄露方式变得非常的急迫。那么，为什么会出现内存溢出呢？"
tags: [JavaScript, 内存泄漏]
image:
  background: witewall_3.png
comments: true
share: true
---
# 简介

所谓内存泄露就是内存空间使用完毕之后未回收。在过去Web开发人员并没有太多的去关注内存泄露问题.那时的页面间联系大都比较简单，js使用的功能主要是表单校验，不会有太多关于特效以及业务等方面上的扩展，而进入WEB 2.0 时代，js人们对Web应用有了高更的要求.一个页面很可能数小时不会发生URL跳转，并同时通过Web服务动态的更新页面内容.复杂的事件关联设计、基于对象的JScript和DHTML技术的广泛采用，使得代码的能力达到了其承受的极限.在这样的情况和改变下，弄清楚内存泄露方式变得非常的急迫。那么，为什么会出现内存溢出呢？

<!--more-->
							
# 内存分配与垃圾回收

说道内存泄露，就不得不谈到内存分配的方式。内存分配有三种方式，分别是：

## 静态分配(Static Allocation )

静态变量和全局变量的分配形式。如果把房间看做一个程序，我们可以把静态分配的内存当成是房间里的耐用家具。通常，它们无需释放和回收，因为没人会天天把大衣柜当作垃圾扔到窗外。

## 自动分配( Automatic Allocation )

在栈中为局部变量分配内存的方法。栈中的内存可以随着代码块退出时的出栈操作被自动释放。
这类似于到房间中办事的人，事情一旦完成，就会自己离开，而他们所占用的空间，也随着这些人的离开而自动释放了。

## 动态分配( Dynamic Allocation )

在堆中动态分配内存空间以存储数据的方式。也就是程序运行时用malloc或new申请的内存，我们需要自己用free或delete释放。动态内存的生存期由程序员自己决定。一旦忘记释放，势必造成内存泄露。这种情况下，堆中的内存块好像我们日常使用的餐巾纸，用过了就得扔到垃圾箱里，否则屋内就会满地狼藉。因此，懒人们做梦都想有一台家用机器人跟在身边打扫卫生。在软件开发中，如果你懒得释放内存，那么你也需要一台类似的机器人——这其实就是一个由特定算法实现的垃圾收集器。而正是垃圾收集机制本身策略的一些缺陷，导致了javascript内存泄漏。具体到浏览器中的实现，通常有以下两个策略：

### 标记清除

Javascript最常用的垃圾回收方式是“标记清除”(mark-and-sweep)。当变量进入环境（如在函数中声明了一个变量），则为其标记为“进入环境”；当变量离开环境，则为其标记为“离开环境”。垃圾回收器会定时扫描那些“离开环境”的变量，销毁那些被标记的值并回收它们所占的内存。
除了IE7以前的版本、Netscape Navigate3.0,其他版本的浏览器都用的是标记清除的垃圾回收策略。

### 引用计数

引用计数的含义是跟踪记录每个值被引用的次数，如当声明一个变量并将一个引用类型赋给该变量时，这个值的引用次数就是1，如果这个引用类型赋给另一个变量，它的引用类型加1,。相反，如果第一个变量又引用了其他引用类型时，之前的引用类型的引用次数就减1，直到减成0。当垃圾回收下一次运行的时候，就会释放掉引用次数为0的引用类型的内存。
该方式有一个严重的问题，请看下面例子：

{% highlight JavaScript %}
function problem(){
	var objA = {};
	var objB = {}; 
	
	objA.someOtherObject = objB;
	objB.anotherObject = objA;
}
{% endhighlight %}

objA、objB通过各自的属性相互引用，如果采用引用计数，objA和objB会一直存在。假使这个函数多次被调用，大量内存不能回收，直接导致内存泄漏。

# 常见内存泄漏及解决

## 循环引用(Circular References)

IE浏览器的COM组件产生的对象实例和网页脚本引擎产生的对象实例相互引用，就会造成内存泄漏。这也是Web页面中我们遇到的最常见和主要的泄漏方式；
<br />例:

{% highlight JavaScript %}
var element = document.getElementById(“some-element”);
var myobject = {}; 
myobject.element = element;
element.someElement = myobject;
{% endhighlight %}

在此例中DOM元素与一个原生javascript对象形成循环引用，其中myobject.element指向element元素，element.someElement指向element对象，由于存在这个循环引用，即使将该DOM从页面中移除，它也永远不会被回收。为了避免该问题，最好在使用完毕后手动将其移除:

{% highlight JavaScript %}
var element = document.getElementById(“some-element”);
var myobject = {}; 
myobject.element = element;
element.someElement = myobject;
//当使用完后
myobject.element = null;
element.someElement = null;
{% endhighlight %}

为了解决上述问题，IE9以后将所有的BOM和DOM都转换成了javascript对象，这样，就避免了两种垃圾回收机制都存在的问题，也就消除了常见的内存泄漏的问题。

## 内部函数引用(Closures)

Closures也就是闭包，外部变量可以应用内部函数的局部变量，当外部变量一直引用，那么该局部变量会在内存中一直存在，如果有大量这样的情况，则可能会出现内存泄漏；
<br />例:

{% highlight JavaScript %}
function closures() {
	var a = 10;
	return function () {
		return a;
	}
}
var b = closures()();
{% endhighlight %}

在此例中，closures函数下有个闭包，返回了该函数的局部变量a，外部有一个变量b引用了a，则如果b不释放a，a会一直存在于内存中，解决方法就是在在b使用完后，主动的释放b：
{% highlight JavaScript %}
function closures() {
	var a = 10;
	return function () {
		return a;
	}
}
var b = closures()();
//b使用完后
b = null;
{% endhighlight %}

>原文摘自《Web前端案例教材》 ---重庆理工大学创新实验室

<strong>end</strong>