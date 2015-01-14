---
layout: post
title: 简单几行代码，实现JavaScript中的AOP
description: "JavaScript中的AOP的模拟与实现"
tags: [JavaScript]
image:
  background: witewall_3.png
comments: true
share: true
---

>AOP我们在后台常常听见，那么在前端是否也有这个概念呢？

## 现存的方式

我们写了一段计算比较密集的代码：

{% highlight JavaScript %}
function complexFunc() {
	sleep(1000)
}

function sleep(maxtime) {
	var now = +new Date();
	while(true) {
		if(+new Date() - now > maxtime) {
			break;
		}
	}
}
{% endhighlight %}

我们在这边定义一个复杂函数，用一个伪睡眠函数模拟。突然需求来了：

>产品经理：这个函数计算时间挺多的，我们想将这个函数在客户机器上真实的运行时间记录下来做一些统计，你把这个代码改改，加一个统计运行时间的功能发给后台。

>前端程序员：哦，好的。

现在我们向在这个`complexFunc`函数中做执行时间的记录。动手改一下上面的代码。

<!--more-->

{% highlight JavaScript %}
function complexFunc() {
	var now = +new Date();
	sleep(1000);
	//$.get('xxx/log.do?time' + +new Date() - now > maxtime + '&funcName' + arguments.callee.name)	发送给后台
	console.log(+new Date() - d, funcName);	//模拟运行
}

//运行结果：
1014
{% endhighlight %}

代码开开心心写完了，然后需求又来了。

>产品经理：其他几个函数也加一下吧

>前端程序员：嗯，行。

{% highlight JavaScript %}
function complexFunc() {
	var now = +new Date();
	sleep(1000);
	//$.get('xxx/log.do?time' + +new Date() - now > maxtime + '&funcName' + arguments.callee.name)	发送给后台
	console.log(+new Date() - d, funcName);	//模拟运行
}


function otherComplexFunc() {
	var now = +new Date();	//和上面完全重复，复制过来俗称COPY 改
	sleep(1500);
	//$.get('xxx/log.do?time' + +new Date() - now > maxtime + '&funcName' + arguments.callee.name)	完全重复
	console.log(+new Date() - d, funcName);	//模拟运行
}

//其它要加统计时间代码的函数
//....
{% endhighlight %}

后台也做了统计完成后：

>产品经理：嗯，这些函数现在没必要统计他的执行时间，你去把那些你家的代码给去掉。

>前端程序员：What the f2ck?

已经上线的项目不能轻易改动，更何况改动如此之大，找都得找半天苦逼的程序员如果出错就只能怪在你身上了T T


## 什么是AOP？

AOP这个概念是来源于后台开发，指面向切面编程。在我们的项目中一般仅限于声明式事务，不过后来在做豌豆荚社区时用到了AOP的异常捕获、会员积分记录、日志系统等。AOP的使用大大的降低了代码的耦合度。真真的实现了代码的可插拔。

可以使用现实中的例子：年轮。树的年轮用来记录树的年龄，每一年加一轮。我们可以把与业务无关的代码就像是年轮一样将之包裹，并没有侵害已有代码，如果不需要这个功能，就在调用的时候给去掉。**要知道，在调用处改比在函数实现内部改要好一万倍！**

传统AOP的实现原理为动态代理，我之前层深入分析过[对Spring.Net的AOP一些思考及应用](http://blog.csdn.net/hacke2/article/details/12753379),[动态代理及JDK动态代理源码分析](http://blog.csdn.net/hacke2/article/details/23712633)。每一个代理类不用重新定义，而是只要你符合那个规范会利用反射技术动态生成出那个代理对象。我们使用JavaScript语言的特殊性，轻轻松松就可以实现代码的可插拔。

## 函数的封装

我们知道，我们可以给JavaScript原生对象扩展其属性、方法。JavaScript对于`功能的封装`就是在函数里，我们在函数里面扩展一个before方法。

{% highlight JavaScript %}
//前置通知
Function.prototype.before = function(func) {
	var that = this;
		args = [].slice.call(arguments,1);
	return function() {
		//debugger
		if(func.apply(this, args) === false) {
			return false;
		}
		return that.apply(this, arguments);
	}
}

//后置通知
Function.prototype.after = function(func) {
	var that = this;
		args = [].slice.call(arguments,1);
	return function() {
		var ret = that.apply(this, arguments);
		if(ret === false) {
			return false;
		}
		func.apply(this, args);
		return ret;
	}
}

//环绕型
Function.prototype.around = function(beforeFunc, afterFunc) {
	var that = this;
	return function() {
		return that.before(beforeFunc).after(afterFunc).apply(this, args);
	}
}

//捕获异常
Function.prototype.throwing = function(throwingFunc) {
	var that = this;
		args = [].slice.call(arguments,1);
	return function() {
		try {
			return that.apply(this, arguments);
		} catch(e) {
			throwingFunc && throwingFunc.call(this, e, args);
		}
	}
}

{% endhighlight %}

这里先只提供四个API：

* 前置通知before:在函数调用之前调用的函数func
* 后置通知after:在函数调用之后调用的函数func
* 环绕通知around:传递前置、后置函数，将其包裹
* 抛出异常后通知throwing:异常的控制

只说说第一个函数，这里有一个闭包，引用了上一层传来`this`和`arugments`的返回一个加工后的函数。在这里我们并不是简简单单的只是将功能函数在业务函数之前执行，而是判断了一下功能函数的返回值，如果是`false`。则不执行已有函数，类似于一个`拦截器`或者`过滤器`的功能，在NOde.js叫中间件。

因为是直接扩展在`Function`上的，可以进行`链式操作`。如：

{% highlight JavaScript %}
func.before(func1).before(func2).after(func2)(arg1)
{% endhighlight %}

## 重构上面的代码

下面，我们来重构一下

{% highlight JavaScript %}
//将时间记录函数封装一下
function logTime (func) {
	return func = (function() {
		var d;
		return func.around(function() {
			d = +new Date();
		},function() {
			console.log(+new Date() - d, func.name);
		});
	})()
}

//像年轮一样将业务函数包裹，不会污染已有代码
logTime(complexFunc)();

logTime(otherComplexFunc)();

//运行结果：
1014
2024
{% endhighlight %}

<figure>
	<a href="/images/article/2014-11-10/1.jpg">
		<img src="/images/article/2014-11-10/1.jpg" alt="home" />
	</a>
	<figcaption>像年轮一样无限扩展。。这就是AOP！</figcaption>
</figure>

我们的代码就像被年轮函数被包裹，而且此函数可以再次被年轮函数包裹！如果需求改动，只需轻轻松松的改动`调用处而非实现处`是不是瞬间世界变得美好了？

## 一些使用场景

上面的代码只是一个使用场景，下面列举几个常见的场景：

* 将一些敏感字符或需要转码的字符过滤，而这个方法并不和业务代码产生耦合。使用`before`几个实现。
* 如本例日志的记录。
* 数据的验证，如果不通过不会执行业务代码，一般为`submit`,并且将逻辑进行了分离。
* 无限的想象力...
* 异常的控制

## 一些展望

在Spring提供的AOP，我们有一个非常强大的功能：`切入点表达式`,比如一下代码：

{% highlight JavaScript %}
execution(* com.spring.service.*.*(String,..)) and args(msg,..)
{% endhighlight %}

我们可以写一个表达式来动态的给函数来绑定一些前置通知，后置通知等。在JavaScript中，我们可以使用正则来完成定义表达式的策略。扫描当前JS的函数后包装函数，要修改功能只需动态的修改配置就可以实现功能的插拔，真正意义上实现JavaScript的AOP！

## 总结

总的来说有一下几点好处：

* 降低模块的耦合度
* 使系统容易扩展
* 设计决定的迟绑定：使用AOP,设计师可以推迟为将来的需求作决定
* 更好的代码复用性

使用面向切面编程能将我们的代码逻辑进行分离，将问题细化为单独部分，即可以理解为不可再分割的组件，如上边的日志组件，更好地实现模块化、组件化。还不赶紧重构你的代码？


**文章来自 [{{ site.url }}]({{ site.url }})**