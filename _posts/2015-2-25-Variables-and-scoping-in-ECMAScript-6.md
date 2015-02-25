---
layout: post
title: 译-ES6里的变量和作用域
description: "在ES6中变量和作用域的使用方法"
tags: [翻译]
image:
  background: witewall_3.png
comments: true
share: true
---

>http://www.2ality.com/2015/02/es6-scoping.html 原文链接

在本文将有大量的例子介绍在ES6中作用域和变量的使用方法

## 1.块级作用域的let和const

让`let`和`const`创造块级作用域，他仅仅存在于包裹他们的最内层的块。下面代码演示了使用`let`修饰的`tmp变量`仅仅存在于最里层的`if`申明里。

{% highlight JavaScript %}
function func() {
    if (true) {
        let tmp = 123;
    }
    console.log(tmp); // tmp未定义
}
{% endhighlight %}

相比之下，用var申明的变量在函数级作用域

<!--more-->

{% highlight JavaScript %}
function func() {
    if (true) {
        var tmp = 123;
    }
    console.log(tmp); // 123
}
{% endhighlight %}

块级作用域意味着你在函数里只要是两个不同的块，那么变量名称可以重复。（原文为**影子变量**）

{% highlight JavaScript %}
function func() {
    let foo = 5;
    if (···) {
        let foo = 10; // shadows outer `foo`
        console.log(foo); // 10
    }
    console.log(foo); // 5
}
{% endhighlight %}

## 2.`const`创建不可变的变量

由`let`创建的变量是可变的

{% highlight JavaScript %}
let foo = 'abc';
foo = 'def';
console.log(foo); // def
{% endhighlight %}

`const`创建变量是不可变的

{% highlight JavaScript %}
const foo = 'abc';
foo = 'def'; // TypeError
{% endhighlight %}

注意，`const`并不影响所赋的值是否可变，如果所赋的值是一个对象，那么并不能保证该对象不变。他只是保存一个对象的引用。

{% highlight JavaScript %}
const obj = {};
obj.prop = 123;
console.log(obj.prop); // 123

obj = {}; // TypeError
{% endhighlight %}

如果你想改变量是真正不可变的，那么直接[冻结他的值](http://speakingjs.com/es5/ch17.html#freezing_objects)

{% highlight JavaScript %}
const obj = Object.freeze({});
obj.prop = 123; // TypeError
{% endhighlight %}

### 2.1 循环体内的const

一旦`const`变量创建，那么他就不能改变。但这并不意味着你不能重新声明一个新值，比如在循环体内。

{% highlight JavaScript %}
function logArgs(...args) {
    for (let [index, elem] of args.entries()) {
        const message = index + '. ' + elem;
        console.log(message);
    }
}
logArgs('Hello', 'everyone');

// Output:
// 0. Hello
// 1. everyone
{% endhighlight %}

### 2.2 什么时候我该使用let，什么时候该使用const？

{% highlight JavaScript %}
const foo = 1;
foo++; // TypeError
{% endhighlight %}

如果你想创建的可变变量为基本类型，则，不能使用const。

不过你可以使用`const`修饰引用类型的变量。

{% highlight JavaScript %}
const bar = [];
bar.push('abc'); // array是可变的
{% endhighlight %}

按照最佳实践，一般会把常量(真正不变的)使用大写来表示。

{% highlight JavaScript %}
const EMPTY_ARRAY = Object.freeze([]);
{% endhighlight %}

## 3.临时禁区(TDZ)

被`const`和`let`修饰的变量我叫做它是`临时禁区` (TDZ)。当进入这个作用域，外界就无法访问这些被修饰的变量知道运行结束。

使用`var`修饰的变量没有TDZ。

* 当进入有`var`修饰的变量的作用域中，会在内存中立即创建空间，立即初始化变量，并且设置成`undifined`。
* 在执行过程中如遇到赋值关键字则给变量赋值，否则还是为`undifined`。

使用`let`关键字的拥有TDZ，这意味着它的生命周期如下：

* 当进入有`let`修饰的变量的作用域中，会在内存中立即创建这个变量，不会初始化这个变量。
* 获取或设置未初始化的变量会导致引用错误(ReferenceError).
* 在执行过程中如遇到声明处则初始化且给变量赋值，如果不赋值则为undefined。

`const`的机制与`let`相似，但他必须赋一个值且不能被改变。

在TDZ中，如果获取或者设置一个未初始化会抛出异常。

{% highlight JavaScript %}
if (true) { // 一个新的作用域, TDZ 开始
    //tmp未初始化
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ 结束, `tmp` 被初始化为 `undefined`
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
{% endhighlight %}

下面例子演示了TDZ是临时的(基于时间)的而不是基于位置的：

{% highlight JavaScript %}
if (true) { // 一个新的作用域, TDZ 开始
    const func = function () {
        console.log(myVar); // OK!
    };

    // 在这里已经进入了TDZ，访问 `myVar` 会导致 ReferenceError

    let myVar = 3; TDZ 结束
    func(); // called outside TDZ
}
{% endhighlight %}

### 3.1TDZ的类型检查

一个变量不能再TDZ里访问意味着你也不能在该变量使用`typeof`

{% highlight JavaScript %}
if (true) {
    console.log(typeof tmp); // ReferenceError
    let tmp;
}
{% endhighlight %}

我不认为这将在实践中是一个问题。因为你不能有条件的给某一个作用域加上`let`修饰符。事实上你仍然可以使用`var`修饰符创建全局变量

{% highlight JavaScript %}
if (typeof myVarVariable === 'undefined') {
    // `myVarVariable`不存在，则创建它
    window.myVarVariable = 'abc';
}
{% endhighlight %}

## 4.在循环体的头部中使用`let`修饰符

在循环体中，你每次迭代重新绑定用`let`修饰的变量。允许你这样做的循环:`for`, `for-in`和`for-of` 。

{% highlight JavaScript %}
if (typeof myVarVariable === 'undefined') {
    let arr = [];
    for (let i=0; i < 3; i++) {
        arr.push(() => i);
    }
    console.log(arr.map(x => x())); // [0,1,2]
}
{% endhighlight %}

相比之下，用var声明的循环体中，，每次迭代室友一个单一的值

{% highlight JavaScript %}
if (typeof myVarVariable === 'undefined') {
    let arr = [];
    for (var i=0; i < 3; i++) {
        arr.push(() => i);
    }
    console.log(arr.map(x => x())); // [3,3,3]
}
{% endhighlight %}

为每次迭代得到一个新的绑定似乎有些奇怪,但当你使用循环创建函数(例如回调事件处理)它是非常有用。

## 5.形参

### 5.1 形参和局部变量

如果你声明的变量名正好与形参一致，那么会爆出一个静态错误

{% highlight JavaScript %}
function func(arg) {
    let arg; // static error: duplicate declaration of `arg`
}
{% endhighlight %}

在函数里面再嵌套一个块则会避免这个问题

{% highlight JavaScript %}
function func(arg) {
    {
        let arg; // 影子参数 `arg`
    }
}
{% endhighlight %}

相比之下,用`var`修饰的与形参同名的变量不会出现错误，表现的形式是覆盖了形参。

{% highlight JavaScript %}
function func(arg) {
    var arg; // does nothing
}
{% endhighlight %}

{% highlight JavaScript %}
function func(arg) {
    {
        var arg; // does nothing
    }
}
{% endhighlight %}

### 5.2 默认形参与TDZ

如果形参有默认值,他们被当做一个序列

{% highlight JavaScript %}
// OK: 声明之后访问x
function foo(x=1, y=x) {
    return [x, y];
}
foo(); // [1,1]

// 异常，在YDZ里试图访问y
function bar(x=y, y=2) {
    return [x, y];
}
bar(); // ReferenceError
{% endhighlight %}

### 5.3 默认形参与TDZ

形参默认值的范围是独立于body的作用域(前者围绕后者)。这意味着“inside”定义的方法或函数参数的默认值不知道body的局部变量。

{% highlight JavaScript %}
// OK: 在x已经声明后y访问x
function foo(x=1, y=x) {
    return [x, y];
}
foo(); // [1,1]

// 异常: `x` 试图在TDZ访问 `y`
function bar(x=y, y=2) {
    return [x, y];
}
bar(); // ReferenceError
{% endhighlight %}

## 6.全局对象

JS中的全局对象(浏览器是`windows`，Node.js是global)的bug比特性还要多，尤其在性能这一块，这也就是不奇怪ES6有以下描述：

* 全局对象的属性都是全局变量。在全局范围,`var` 和 `function` 声明创建这些属性
* 是全局变量但不是全局对象的属性。在全局范围,`let` 和 `const`, `Class` 声明创建这些属性

## 7.函数的声明和类的声明

函数声明：

* 块级作用域，像`let`
* 在全局对象创建属性(在全局范围),像var。 
* 声明提升：独立的一个函数声明中提到它的范围,它总是创建之初的范围

下面代码解释了声明提升

{% highlight JavaScript %}
{ // Enter a new scope

    console.log(foo()); // OK, due to hoisting
    function foo() {
        return 'hello';
    }
}
{% endhighlight %}

类的声明：

* 块级作用域
* 不会再全局对象上创建属性
* 不会声明提升

类不升起可能令人惊讶,因为他们创建函数。这种行为的理由是,他们继承条款定义的值通过表达式,表达式必须在适当的时间执行。

{% highlight JavaScript %}
{ // 进入新的作用域
    
    const identity = x => x;

    //这儿是`MyClass`的TDZ
    let inst = new MyClass(); // ReferenceError

    //注意 `extends`
    class MyClass extends identity(Object) {
    }
}
{% endhighlight %}

## 8.扩展阅读

1.[Using ECMAScript 6 today](http://www.2ality.com/2014/08/es6-today.html)

2.[Destructuring and parameter handling in ECMAScript 6](http://www.2ality.com/2015/01/es6-destructuring.html)

**文章来自 [{{ site.url }}]({{ site.url }})**