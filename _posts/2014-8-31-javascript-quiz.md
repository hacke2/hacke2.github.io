---
layout: post
title: Javascript Quiz
description: "Javascript Quiz 练习题解析"
tags: [JavaScript]
image:
  background: witewall_3.png
comments: true
share: true
---

### 1.考点：arguments的类型

{% highlight JavaScript %}
  (function(){
	  return typeof arguments;
  })();
{% endhighlight %}

这个题考的是，乍一看arguments可能是一个数组，因为一般可以这样取到:arguments[0]、arguments[1]、arguments[2]
可其实他是类似于jQuery对象的方式，用类来模拟数组，类似于这样的:

{% highlight JavaScript %}
  var arguments = {
  	  0 : '第一个参数',
	  1 : '第二个参数',
	  2 : '第三个参数',
	  length : 3,
	  //其他属性或方法
  }
{% endhighlight %}

所以结果是 'object'，默认不为undefined

<!--more-->

### 2.考点：函数的内部属性name

{% highlight JavaScript %}
  var f = function g(){ return 23; };
  typeof g();
{% endhighlight %}

g可选可不选,如果加上，则为函数的内部属性，如调用f.name 输出 g，直接调用会说g未定义

### 3.考点：delete

{% highlight JavaScript %}
  (function(x){
      delete x;
      return x;
  })(1);
{% endhighlight %}

delete 会删除对象的属性，如var a ={ b : 1}; delete a.b;此时打印a为{}，但是不会删除形参,输出为1

### 4.考点：赋值顺序

{% highlight JavaScript %}
  var y = 1, x = y = typeof x;
  x;
{% endhighlight %}

基本所有语言都赋值都是从右向左赋值，typeof x得到结果为'undefined'，最终赋给y和x，打印出来为'undefined'

### 5.考点：typeof

{% highlight JavaScript %}
  (function f(f){
    return typeof f();
  })(function(){ return 1; });
{% endhighlight %}

typeof的运算数未定义,返回的就是 "undefined". 运算数为数字 typeof(x) = "number" 字符串 typeof(x) = "string" 布尔值 typeof(x) = "boolean" 对象,数组和null typeof(x) = "object" 函数 typeof(x) = "function" 
函数返回为1，输出'number'

### 6.考点：typeof

{% highlight JavaScript %}
  var foo = {
    bar: function() { return this.baz; },
    baz: 1
  };
  (function(){
    return typeof arguments[0]();
  })(foo.bar);
{% endhighlight %}

和上一题类似，将bar函数传进去，arguments[0]指向foo.bar函数，函数指向，但此时this是window对象，window对象下午baz，所以是'undefined'
若将题目改为以下，则返回'number'

{% highlight JavaScript %}
  var foo = {
    bar: function() { return this.baz; },
    baz: 1
  };
  (function(){
    return typeof arguments[0].call(foo);
  })(foo.bar,foo);
{% endhighlight %}


### 7.考点：作用域

{% highlight JavaScript %}
  var foo = {
    bar: function(){ return this.baz; },
    baz: 1
  }
  typeof (f = foo.bar)();
{% endhighlight %}

原因参见上题,输出'undefined'

### 8.考点：逗号表达式

{% highlight JavaScript %}
  var f = (function f(){ return "1"; }, function g(){ return 2; })();
  typeof f;
{% endhighlight %}

输出为 'function' , f执行的结果为函数表达式里最后一个，如在函数表达式再加一个,function h(){return 3}，则输出3
如果为非函数则为少一个立即执行函数以下代码，输出b

{% highlight JavaScript %}
var f = ('a', 'b');
console.log(f);
{% endhighlight %}

### 9.考点：JavaScript加性操作符

{% highlight JavaScript %}
  var x = 1;
  if (function f(){}) {
    x += typeof f;
  }
  x;
{% endhighlight %}

参考《javascript 高级程序设计 第三版》 3.5.5章,输出为字符串'1undefined'

### 10.考点：typeof

{% highlight JavaScript %}
  var x = [typeof x, typeof y][1];
  typeof typeof x;
{% endhighlight %}

'string'的typeof 肯定也是'string', 输出为字符串'string'

### 11.考点：不知道考的是啥，文字游戏吧

{% highlight JavaScript %}
  (function(foo){
    return typeof foo.bar;
  })({ foo: { bar: 1 } });
{% endhighlight %}

输出'undefined'，如果return typeof foo.foo.bar;为期望值

### 12.考点：函数提升

{% highlight JavaScript %}
  (function f(){
    function f(){ return 1; }
    return f();
    function f(){ return 2; }
  })();
{% endhighlight %}

函数提升了两次，第二次把第一次覆盖了，所以 return 后面的 f 是 return 语句的下一条语句声明的函数 f .

### 13.考点：实例化对象

{% highlight JavaScript %}
  function f(){ return f; }
  new f() instanceof f;
{% endhighlight %}

如果函数无返回值，则返回一个对象的实例，若果有返回值，则为改返回值,输出为false

### 14.考点：with

{% highlight JavaScript %}
  with (function(x, undefined){}) length;
{% endhighlight %}

whth改变了函数的作用域，其实里面的length为函数function(x, undefined){}.length, 函数length表示给函数真正传的参数的个数，为2

>以上题目来源：http://perfectionkills.com/javascript-quiz/