---
layout: post
title: 译-ES6箭头函数和它的作用域
description: "关于ES6里箭头函数及其作用域的使用"
tags: [翻译]
image:
  background: witewall_3.png
comments: true
share: true
---

>http://es6rocks.com/2014/10/arrow-functions-and-their-scope/ 原文链接 摇滚ES6中国站快要上线了，大家期待吧，也可以联系[我](https://github.com/hacke2)或者[ES6组织](https://github.com/es6rocks)为这个活动做出点贡献！

在ES6很多很棒的新特性中, 箭头函数 (或者大箭头函数)就是其中值得关注的一个! 它不仅仅是很棒很酷, 它很好的利用了作用域, 快捷方便的在现在使用以前我们用的技术, 减少了很多代码......但是如果你不了解箭头函数原理的话可能就有点难以理解. 所以,让我们来看下箭头函数, 就是现在!

## 执行环境

你可以自己去学习和尝试下, 你可以简单的把示例程序代码复制到你的浏览器控制台下. 现在, 推荐使用Firefox(22+)开发者工具, Firefox(22+)开发者工具现在支持箭头函数,你也可以使用谷歌浏览器. 如果你使用谷歌浏览器, 你必须要做下列两件事:
- \- 在谷歌浏览器中地址栏中输入："about:flags", 找到 "使用体验性Javascript"选项，开启使用。
- \- 在函数的开头加上"use strict",然后再在你的谷歌浏览中测试箭头函数吧(提示：请用谷歌浏览器v38,我当时就是被浏览器版本坑了):

{% highlight JavaScript %}
(function(){
    "use strict";
    // use arrow functions here
}());
{% endhighlight %}

幸运的是后面会有越来越多的浏览器支持ES6特性. 现在你完成了所有准备工作, 让我们继续深入它吧!

<!--more-->

## 一个新话题

最近大家在讨论关于ES6的一个话题：关于箭头函数, 像这样:

{% highlight JavaScript %}
=>
{% endhighlight %}

## 新的语法

随着讨论产生了一个新的语法：

{% highlight JavaScript %}
param => expression
{% endhighlight %}

新增的语法是作用在变量上, 可以在表达式中申明多个变量, 下面是箭头函数的使用模式:

{% highlight JavaScript %}
//  一个参数对应一个表达式
param => expression;// 例如 x => x+2;

// 多个参数对应一个表达式
(param [, param]) => expression; //例如 (x,y) => (x + y);

// 一个参数对应多个表示式
param => {statements;} //例如 x = > { x++; return x;};

//  多个参数对应多个表达式
([param] [, param]) => {statements} // 例如 (x,y) => { x++;y++;return x*y;};

//表达式里没有参数
() => expression; //例如var flag = (() => 2)(); flag等于2

() => {statements;} //例如 var flag = (() => {return 1;})(); flag就等于1

 //传入一个表达式，返回一个对象
([param]) => ({ key: value });
//例如  var fuc = (x) => ({key:x})
        var object = fuc(1);
        alert(object);//{key:1}
{% endhighlight %}

## 箭头函数是怎么实现的

我们可以把一个普通函数转换成用箭头函数来实现：

{% highlight JavaScript %}
// 当前函数
var func = function (param) {    
	return param.split(" ");
}
// 利用箭头函数实现
var func = param => param.split(" ");

{% endhighlight %}

从上面的例子中我们可以看出箭头函数的语法实际上是返回了一个新的函数, 这个函数有函数体和参数

因此, 我们可以这样调用刚才我们创建的函数:

{% highlight JavaScript %}
func("Felipe Moura"); // returns ["Felipe", "Moura"]
{% endhighlight %}

##  立即执行函数(IIFE)

你能在立即执行函数里使用箭头函数，例如:

{% highlight JavaScript %}
( x => x * 2 )( 3 ); // 6
{% endhighlight %}

这行代码产生了一个临时函数，这个函数有一个形参`x`，函数的返回值为`x*2`,之后系统会马上执行这个临时函数, 将`3`赋值给形参`x`.

下面的例子描述了临时函数体里有多行代码的情况：

{% highlight JavaScript %}
( (x, y) => {
    x = x * 2;
    return x + y;
})( 3, "A" ); // "6A"

{% endhighlight %}

## 相关思考

思考下面的函数：

{% highlight JavaScript %}
var func = x => {
    return x++;
};
{% endhighlight %}

我们列出了一些常见的问题：

**- 箭头函数创建的临时函数的`arguments`是我们预料的那样工作**

{% highlight JavaScript %}
console.log(arguments);
{% endhighlight %}

**- `typeof`和`instanceof`函数也能正常检查临时函数**

{% highlight JavaScript %}
func instanceof Function; // true
typeof func; // function
func.constructor == Function; // true
{% endhighlight %}

**- 把箭头函数放在括号内是无效的**

{% highlight JavaScript %}
//  有效的常规语法
(function (x, y){
    x= x * 2;
    return x + y;
} (3, "B") );

// 无效的箭头函数语法
( (x, y) => {
    x= x * 2;
    return x + y;
} ( 3, "A" ) );

// 但是可以这样写就是有效的了：
( (x,y) => {
	x= x * 2;return x + y;
} )( 3,"A" );//立即执行函数
{% endhighlight %}

**- 尽管箭头函数会产生一个临时函数，但是这个临时函数不是一个构造函数**

{% highlight JavaScript %}
var instance= new func(); // TypeError: func is not a constructor
{% endhighlight %}

**- 同样也没有原型对象**

{% highlight JavaScript %}
func.prototype; // undefined
{% endhighlight %}

## 作用域

这个箭头函数的作用域和其他函数有一些不同,如果不是严格模式，`this`关键字就是指向`window`，严格模式就是`undefined`，在构造函数里的`this`指向的是当前对象实例,如果this在一个对象的函数内则`this`指向的是这个对象，`this`有可能指向的是一个`dom元素`，例如当我们添加事件监听函数时,可能这个`this`的指向不是很直接，其实`this`（不止是`this`变量）变量的指向是根据一个规则来判断的：作用域流。下面我将演示`this`在事件监听函数和在对象函数内出现的情况： 

在事件监听函数中：

{% highlight JavaScript %}
document.body.addEventListener('click', function(evt){
    console.log(this); // the HTMLBodyElement itself
});
{% endhighlight %}

在构造函数里：

{% highlight JavaScript %}
function Person () {

    let fullName = null;

    this.getName = function () {
        return fullName;
    };

    this.setName = function (name) {
        fullName = name;
        return this;
    };
}

let jon = new Person();
jon.setName("Jon Doe");
console.log(jon.getName()); // "Jon Doe"
//注：this关键字这里就不解释了，大家自己google,badu吧。
{% endhighlight %}

在这个例子中，如果我们让Person.setName函数返回Person对象本身，我们就可以这样用：

{% highlight JavaScript %}
jon.setName("Jon Doe")
   .getName(); // "Jon Doe"
{% endhighlight %}

在一个对象里:

{% highlight JavaScript %}
let obj = {
    foo: "bar",
    getIt: function () {
        return this.foo;
    }
};

console.log( obj.getIt() ); // "bar"
{% endhighlight %}

但是当执行流(比如使用了setTimeout)和作用域变了的时候，this也会变。

{% highlight JavaScript %}
function Student(data){

    this.name = data.name || "Jon Doe";
    this.age = data.age>=0 ? data.age : -1;

    this.getInfo = function () {
        return this.name + ", " + this.age;
    };

    this.sayHi = function () {
        window.setTimeout( function () {
            console.log( this );
        }, 100 );
    }

}

let mary = new Student({
    name: "Mary Lou",
    age: 13
});

console.log( mary.getInfo() ); // "Mary Lou, 13"
mary.sayHi();
// window

{% endhighlight %}

当`setTimeout`函数改变了执行流的情况时，`this`的指向会变成全局对象,或者是在严格模式下就是`undefine`,这样在`setTimeout`函数里面我们使用其他的变量去指向`this`对象，比如`self`，`that`,当然不管你用什么变量，你首先应该在setTimeout访问之前，给`self`，`that`赋值，或者使用`bind`方法不然这些变量就是undefined。

这是后就是箭头函数登场的时候了，它可以保持作用域，this的指向就不会变了。

让我们看下上文**起先**的例子，在这里我们使用箭头函数：

{% highlight JavaScript %}
function Student(data){

    this.name = data.name || "Jon Doe";
    this.age = data.age>=0 ? data.age : -1;

    this.getInfo = function () {
        return this.name + ", " + this.age;
    };

    this.sayHi = function () {
        window.setTimeout( ()=>{ 
        	// the only difference is here
            console.log( this );
        }, 100 );
    }

}

let mary = new Student({
    name: "Mary Lou",
    age: 13
});

console.log( mary.getInfo() ); // "Mary Lou, 13"
mary.sayHi();
// Object { name: "Mary Lou", age: 13, ... }

{% endhighlight %}

>分析：在sayHi函数中，我们使用了箭头函数，当前作用域是在student对象的一个方法中，箭头函数生成的临时函数的作用域也就是student对象的sayHi函数的作用域。所以即使我们在setTimeout调用了箭头函数生成的临时函数，这个临时函数中的this也是正确的指向。

##  有趣和有用的使用

创建一个函数很容易，我们可以利用它可以保持作用域的特征：

例如我们可以这么使用：Array.forEach()

{% highlight JavaScript %}
var arr = ['a', 'e', 'i', 'o', 'u'];
arr.forEach(vowel => {
    console.log(vowel);
});
{% endhighlight %}

>分析：在forEach里箭头函数会创建并返回一个临时函数 tempFun,这个tempFun你可以想象成这样的：function(vowel){ console.log(vowel);}但是Array.forEach函数会怎么去处理传入的tempFunc呢？在forEach函数里会这样调用它：tempFunc.call(this,value);所有我们看到函数的正确执行效果。


map里使用箭头函数，这里我就不分析函数执行过程了。。。。

{% highlight JavaScript %}
var arr = ['a', 'e', 'i', 'o', 'u'];
arr.map(vowel => {
    return vowel.toUpperCase();
});
// [ "A", "E", "I", "O", "U" ]
{% endhighlight %}

费布拉奇数列

{% highlight JavaScript %}
var factorial = (n) => {
    if(n==0) {
        return 1;
    }
    return (n * factorial (n-1) );
}

factorial(6); // 720
{% endhighlight %}

我们也可以用在Array.sort方法里：

{% highlight JavaScript %}
let arr = ['a', 'e', 'i', 'o', 'u'];
arr.sort( (a, b)=> a < b? 1: -1 );
{% endhighlight %}

也可以在事件监听函数里使用：

{% highlight JavaScript %}
document.body.addEventListener('click', event=>console.log(event, this)); // EventObject, BodyElement
{% endhighlight %}

## 推荐的链接

下面列出了一系列有用的链接，大家可以去看一看

- \- [Arrow Functions in MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- \- [TC39 Wiki about Arrow Function](http://tc39wiki.calculist.org/es6/arrow-functions/)
- \- [ESNext](https://github.com/esnext)
- \- [ES6 Tools](https://github.com/addyosmani/es6-tools)
- \- [Grunt ES6 Transpiler](https://www.npmjs.org/package/grunt-es6-transpiler)
- \- [ES6 Fiddle](http://www.es6fiddle.net/)
- \- [ES6 Compatibility Table](http://kangax.github.io/compat-table/es6/)

## 总结

尽管大家可能会认为使用箭头函数会降低你代码的可读性，但是由于它对作用域的特殊处理，它能让我们能很好的处理this的指向问题。箭头函数加上let关键字的使用，将会让我们javascript代码上一个层次！尽量多使用箭头函数，你可以再你的浏览器测试你写的箭头函数代码，大家可以再评论区留下你对箭头函数的想法和使用方案！我希望大家能享受这篇文章，就像你会不就的将来享受箭头函数带给你的快乐.

**文章来自 [{{ site.url }}]({{ site.url }})**