---
layout: post
title: 译-你需要知道的块级作用域 - let
description: "JavaScript 未来声明变量的方式"
tags: [翻译]
image:
  background: witewall_3.png
comments: true
share: true
---

>http://es6rocks.com/2014/08/what-you-need-to-know-about-block-scope-let/ 原文链接

变量声明在任何语言中都是非常基础的东西，理解变量在作用域下如何工作是非常重要的事情。

在大多数语言中，如`Python`，他有两个作用域:局部 和 全局。如下，变量定义在代码开头部分则为全局变量，在函数里面声明变量则为局部变量。

JavaScript也很相似，看以下例子：

<!--more-->

{% highlight Python%}
# Python
x = 1 # 全局变量
y = 3

def sum(a, b):
    s = a + b # 局部变量
    return s
{% endhighlight %}


{% highlight JavaScript%}
// JavaScript
var x = 1;  // 全局变量
var y = 3;

function sum(a, b) {
    var s = a + b;  // 局部变量
    return s;
}
{% endhighlight %}

以C语言为基础而衍生出来的语言(JavaScript, PHP)一般是块级作用域，但JavaScript却不是，当你在一个函数体内声明一个变量，他会在父级或者全局来寻找这个变量，这种行为叫做`变量提升`，与其他语言不同，JavaScript会在`for循环`外面使用这些变量。

看下面这个例子

{% highlight JavaScript%}
// JavaScript
for (var i = 0; i <= 2; i += 1) {
    console.log(i); // current i
}
console.log(i); // last i
{% endhighlight %}

在这个例子中，i竟然可以在循环外面被访问到！这在其他语言是不可思议的！这是很常见的问题，但JS程序员不见得都会关注它。

## let 声明

let在ES6中出现是为了`代替`var。是的，我们的想法是在未来停用`var`，现在就停止时不切实际的，因为有很多网站都还在用它。

使用`let`会像和其他语言大道预期的效果

例子：

{% highlight JavaScript%}
let foo = true;
if  (foo) {
    let bar = 'baz';
    console.log(bar); // outputs 'baz'
}

try {
    console.log(bar);
} catch (e) {
    console.log("bar doesn't exist");
}
{% endhighlight %}

正如你想看到的,`let`会解决在for循环变量的问题。

## 现在的支持

你现在就可以使用let

查看 Kangax 的ES6 支持表格 > http://kangax.github.io/compat-table/es6/#.
let已经在z最新的现代浏览器有所支持( >= IE 11)和[Traceur](https://github.com/google/traceur-compiler)编译器

你可以在火狐开发者工具中试试

![es6 let](http://es6rocks.com/img/let.gif)

注： Michał Gołębiowski 指出在各个浏览器的规范不一样，使用时可能会出现bug。在当前还未正式流行开，这种情况可能会持续到2015年中旬。

## 结论

声明变量虽然简单,但在JavaScript语言中会让初学者头痛的。
`let`声明变量更直观,符合基于c的语言.

var应该停止使用,只有这样，没有变量提示的`let`才能正在运用到未来。


**文章来自 [{{ site.url }}]({{ site.url }})**