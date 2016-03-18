---
layout: post
title: 译-Javascript中的Iterables和Iterators
description: "ES6迭代器介绍"
tags: [Javascript, ES6]
image:
  background: witewall_3.png
comments: true
share: true
---

>迭代器是es6引入的重要概念(Java中很早就有了)，也是理解generator的基础。英文原文：http://jsrocks.org/2015/09/javascript-iterables-and-iterators/


ECMAScript 2015 (ES6) 介绍了两个新的概念，它们密切相关: **iterables** and **iterators**.<br>
希望你在阅读了这篇文章后，会了解到这两个概念的重要性，并且能在日常开发中使用它们。

<!--more-->

## Iterables

可遍历对象：是指实现了[Iterable interface](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-iterable-interface)接口的对象. 可遍历对象会暴露一个遍历方法，我们可以通过这个暴露的方法去自定义遍历行为。

请看下面的demo：

```js
//推荐google浏览器，执行报错的话，说明你的浏览器不支持这两个新的特征，我用的是google chrome v45.0,顺利执行
let iterable = [1, 2, 3];
for (let item of iterable) {
	console.log(item); // 1, 2, 3
}

let iterable2 = new Set([4, 5, 6]);
for (let item of iterable2) {
	console.log(item); // 4, 5, 6
}

let iterable3 = '789';
for (let item of iterable3) {
	console.log(item); // '7', '8', '9'
}

let notIterable = {name:'alibaba'};
for(let item of notIterable){
	console.log(item) // 执行报错！原因很简单，普通Oject并不是可遍历对象
}
```

[for-of](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...of) 语法支持可遍历对象, 因此我们可以这种规范的遍历语法去遍历实现了Iterable接口的对象。

### 那Iterable接口到底是个什么东东?

这里的Iterable其实是指一个`[Symbol.iterator]`方法，任何对象只要包含了这个`[Symbol.iterator]`方法，它就是可遍历对象。<br>
如果你不太了解这个ES6新特征Symbol你可以看下这篇文章：[阮一峰：es6 symbols](http://es6.ruanyifeng.com/#docs/symbol)（你也可以看英文文章：[symbols](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)）。<br>
`Symbol.iterator` 是个一个 [*well-known*](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol#Well-known_symbols) (内置于语言内部) Symbol, 他主要用于定义可遍历对象。

在刚才的例子中，我们其实隐式的使用了`[Symbol.iterator]`方法，在Array,Set,String的原型prototype里都包含了`[Symbol.iterator]`方法。比如 [Array](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array), [Set](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set), [String](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String) and [Map](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Map) 它们都定义了默认的遍历行为, 然而[Object](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object) 并没这个方法。

Iterable接口允许自定义遍历行为，请看下面的例子，我们讲对象的遍历行为设置为数组的遍历行为，让对象能像数组那样遍历：

```js
let iterable = {
	0: 'a',
	1: 'b',
	2: 'c',
	length: 3,
	[Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
	console.log(item); // 'a', 'b', 'c'
}
//这个还是比较实用的，毕竟在es5中Oject遍历用for in不是很简洁。
```

现在你可能会问：**"怎样才能自定义遍历行为？"**<br>
我们已经知道：添加一个`[Symbol.iterator]`可以让一个对象变为可遍历的，但是需要注意一点的是：`[Symbol.iterator]`方法必须返回一个 *iterator object* ，就是这个iterator object负责完成遍历逻辑。不要急，在下一个部分我们介绍它的。

在介绍iterators(迭代器)之前，让我们先来回顾下Iterable interface的概念：

- 它意味着可以给使用者一个可遍历的对象(iterable object: "嗨，我有一个`[Symbol.iterator]` 方法.");
- 它会提供一个标准的方法去遍历任何可遍历的对象(iterable object: "亲，你可以调用`[Symbol.iterator]`方法去完成遍历过程").


## Iterators

迭代器对象是指实现了[Iterator interface](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-iterator-interface)的对象，迭代器对象必须拥有一个`next`方法，并且这个方法的返回值必须要是 `{ value: Any, done: Boolean }`这种格式的对象，当我们第一次调用next方法时，next方法会返回第一个遍历结果元素。这个`done`属性是指当前遍历的元素是否是最后一个元素，如果done:true意味着所有遍历完成。

下面例子介绍如何使用遍历器去遍历数组：

```js
let iterable = ['a', 'b', 'c'];


// 获取遍历器
let iterator = iterable[Symbol.iterator]();

//使用next方法遍历元素(好像java遍历器)
iterator.next(); // { value: 'a', done: false }
iterator.next(); // { value: 'b', done: false }
iterator.next(); // { value: 'c', done: false }
iterator.next(); // { value: undefined, done: true }

```

最开始的例子我们不是使用for-of的语法么！现在我们来看一下for-of语法的内部实现方式：

```js
let iterable = ['a', 'b', 'c'];


// 简便语法，利用for-of
for (let item of iterable) {
	console.log(item); // 'a', 'b', 'c'
}

// for-of的内部实现方式，是不是感觉很简单！真的好像java遍历器
for (let _iterator = iterable[Symbol.iterator](), _result, item; _result = _iterator.next(), item = _result.value, !_result.done;) {
	console.log(item); // 'a', 'b', 'c'
}
```

现在我们知道了iterables和iterators后，现在我们可以创建自定义遍历行为的可遍历对象了。首先，我们先来自己实现一个类似数组遍历行为的遍历器：

```js
let iterable = {
	0: 'a',
	1: 'b',
	2: 'c',
	length: 3,
	[Symbol.iterator]() {
		let index = 0;
		return {
			next: () => {
				let value = this[index];
				let done = index === this.length;
				index++;
				return { value, done };
			}
		};
	}
};

//使用for-of语法完成遍历
for (let item of iterable) {
	console.log(item); // 'a', 'b', 'c'
}
```

额，这个看起来是有点复杂，不清晰，但是不要慌，让我们仔细的分析下它。

我们一开始用JavaScript本文化特征语法创建了一个对象。并且用 [computed properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) 和 [shorthand methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions) ES2015 本文化扩展语法给这个对象定义了一个`[Symbol.iterator]`方法，这个对象有了`[Symbol.iterator]`方法，因此他也成了一个可遍历对象。

这个`[Symbol.iterator]`方法实现了默认的遍历行为，这个方法返回了一个遍历器对象，这个遍历器对象包含了上文我们说的next方法，所以我们才能把`[Symbol.iterator]`方法返回的对象视为遍历器对象。

其中`next`方法里面用到了[arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，所以next方法里的this才会指向iterable对象。（个人来说，我认为ES6 中箭头函数是最强大，最实用，最能简化现有js开发的新特征之一，个人看法，不喜勿喷）。

next方法返回了一个由value和done属性组成的对象，语法很简洁，很实用，用的是[shorthand properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Property_definitions)语法，简单来说{value,done}就等于{'value':value,'done':done}。

看到这里，相信你已经完全上面例子里每行代码是怎么工作的了。`for-of`语法会调用 `[Symbol.iterator]`方法来获取遍历器对象，遍历对象里有一个next方法，通过调用next方法遍历元素。

### 有必要把一个遍历接口设计得这么复杂?  
恩，总之是需要的。下面我讲列出最常见的问题和疑惑，并以QA的方式展现给大家。

### Q. 为什么是`[Symbol.iterator]`属性是一个方法，这个方法会返回一个遍历器，而不是这个属性直接就是一个遍历器？

原因是：如果直接是一个遍历器，当你同时想多次遍历时，就不能实现了，同时多次遍历这个可能有点难理解，请看下面的代码：

```js
let iterable = [1, 2, 3, 4];
let iterator1 = iterable[Symbol.iterator]();
let iterator2 = iterable[Symbol.iterator]();

iterator1.next(); // { value: 1, done: false }

iterator2.next(); // { value: 1, done: false }
iterator2.next(); // { value: 2, done: false }
iterator2.next(); // { value: 3, done: false }

iterator1.next(); // { value: 2, done: false }

//可以看到iterator1和iterator2是互不影响的
```

这个例子很勉强，重复遍历相同的数据事时上不太常见。但是异步处理迭代之间的每个值，这在[Koa](http://koajs.com/)和[co](https://github.com/tj/co)中就很好地表现了这一点。尽管它们是利用生成器函数返回的遍历器。

### Q. 为什么遍历器的`next`方法返回一个新的数据结构，而不是直接返回遍历的元素值呢？

在最初的遍历器设计中，这个`next`方法只会返回元素值。那么问题就来了：我怎么知道遍历器已经完成所有的遍历行为呢? 如果让`next`函数抛出一个错误来标明遍历已完成这样又太土了！因为这样你在调用`next`函数时，就必须给它包一层`try/catch`。所以才会让`next`函数返回的数据里有一个`done`属性。

### Q. 为什么遍历器最后一个遍历结果让人感觉有点冗余?

请看下面的代码：

```js
let iterable = [1, 2];

let it = iterable[Symbol.iterator]();


it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }

//明明只有2个元素，为毛非要遍历三次，才算遍历完成，蛋疼？？？？！！！！
it.next() // { value: undefined, done: true }

```

当`next`方法返回的结果`done`属性为`true`时，遍历才算完成，并且`value`属性的值为`undefined`。遍历器让value和`down:true`的对象为返回值，是为了让这个`down:true`的对象作为一个遍历完成的标志，并不是一个遍历的元素。例如在`for-of`,`Array.from`的内部实现里，它们都会忽略掉这个返回值。

### Q. 我能让遍历器的`next`方法接收参数么?

是的，这样是可以的。请看下面的例子：

```js
let echoIterator = {
	next(value) {
		return { value, done: false };
	}
};

echoIterator.next(42); // { value: 42, done: false }
```

正如上面的例子一样，你在自定义的遍历器里，是可以给next方法配置参数的！但是这种遍历器如果使用`for-of`或`Array.from`这些语法时，就会发生异常，因为`for-of`在调用你的next方法时并不会传递参数给next方法。所以请慎用这种方式。

### Q. 是否可以无限的调用遍历器的遍历方法？

是的，你可以无限的调用遍历器的`next`方法，即使遍历行为已经完成。只是返回的结果都是value=undefined,down=true的对象。


## 可遍历的遍历器（Iterable iterators）

先来一个快速的知识回顾：

- 可变遍历接口要求实现一个`[Symbol.iterator]`方法;
- 遍历器接口需要实现一个`next`方法;

请打开你的脑洞：要是我们让一个对象既有`[Symbol.iterator]`方法，既有`next`方法，那这个对象岂不是成了一个可遍历的遍历器了。

实际上，大多数遍历器都实现了可遍历接口，都有`[Symbol.iterator]`方法，但是请记住：遍历器的`[Symbol.iterator]`方法通常会返回遍历器本身，而不是一个新的遍历器对象。

请看下面的例子：

```js
let iterable = [1, 2];
let iterator = iterable[Symbol.iterator]();


var iterator1 = iterable[Symbol.iterator]();
var iterator2 = iterable[Symbol.iterator]();
iterator1 == iterator2 // false
//为毛iterator1又不等于iterator2了？ 亲，iterator1和iterator2是分别由Iterable Oject的`[Symbol.iterator]`方法生成的对象，它们当然不相等了。

var iterator3 = iterator[Symbol.iterator]();
var iterator4 = iterator[Symbol.iterator]();
iterator == iterator3 == iterator4 // true
//iterator3和iterator4都是指向的是iterator,iterator和iterator3和iterator4其实是一个对象所以它们是相等的。

```

这是一个简单的可遍历的遍历器：

```js
let iterableIterator = {

	next() {/*...*/},
	
	[Symbol.iterator]() {
		return this;
	}
};
```

现在你可能会问：**这样有什么用啊? 然并卵？**

好的，现在请思考一个问题： **一个数据源可能需要有多次遍历行为.**<br>
请记住：`for-of`语法的内部实现里，它会重复调用iterable对象的`[Symbol.iterator]`方法来获取iterator.（我这这里其实有一个疑问：为毛for-of的内部实现里，会一直不断的获取iterator,既然iterator的`[Symbol.iterator]`方法方法会返回iterator自身，那还需调用这个方法来获取iterator嘛！这个疑问估计得看真正的for-of的内部实现源码才能明白了）

通过给iterator对象添加`[Symbol.iterator]`方法来返回iterator对象本自身，这样设计很重要的一点就是：`通用`。

怎么解释这个通用呢？

假设现在有一个方法A,方法A接收的参数是一个Iterable Object(方法A是干啥的你先不要关心),但是你现在传递了一个iterator对象给方法A,试想一下如果iterotor对象里没有`[Symbol.iterator]`方法，那方法A肯定不能顺利执行了。所以当给iterator对象添加`[Symbol.iterator]`方法后，任何需要参数为Iterable object的函数，你传给这个函数一个iterator对象，这个函数还是能正常work。希望我这样解释`通用`大家能明白。


```js
let arr = ['a', 'b'];
let keysIterator = arr.keys(); // 获取遍历器

keysIterator[Symbol.iterator]() === keysIterator; // `keysIterator` 就是一个 Iterable iterator

//for-of会重复的调用`keysIterator[Symbol.iterator]()`，来获取`keysIterator`
//之后遍历它
for (let key of keysIterator) {
	console.log(key); // 0, 1 (the array indexes)
}

```

## 可能会中枪的小细节

因为iterator的`[Symbol.iterator]`方法会返回iterator自身，所以我们在用的时候一定要小心这个问题，不然代码执行出错了就坑爹了。

请看下面的例子：

```js
let iterable = [1, 2, 3, 4];

let iterator = iterable[Symbol.iterator]();

//先手动的遍历2次
iterator.next();
iterator.next();

//再调用for-of去遍历
for (let item of iterator) {
	console.log(item); // 3, 4
	//注意了这里只遍历了2次，并不会从头开始遍历
}

//如果你想从头开始遍历，你可以这样写
for (let item of iterable[Symbol.iterator]()) {
	console.log(item); // 1, 2, 3, 4
}
```

原因就不在多说了，相信大家都懂的。


## 总结

啊啊啊啊啊！谢谢你看完了这篇文章！希望我的介绍没问题，让你理解了iterables和iterators。

恩，文章差不多结束了，可能你有想继续学习ES6的内容，你可以看下，下一篇文章：[Generators](http://www.ecma-international.org/ecma-262/6.0/index.html#sec-generatorfunction-objects)。

最后如果你想改善一下这篇文章，请点击这里：[JS Rocks repository](https://github.com/JSRocksHQ/jsrockshq.github.io)(额，这是英文原文)，我们将会很高兴地与你讨论并接纳你的意见。

至于文章知识点总结就省略了，希望大家不要打我...


## 参考

- [ECMAScript® 2015 Language Specification - Ecma International](http://www.ecma-international.org/ecma-262/6.0/index.html)
- [for...of - MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/for...of)
- [Iteration protocols - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [for-of reimplementation - Babel](http://babeljs.io/repl/#?experimental=false&evaluate=true&loose=false&spec=false&playground=true&code=let%20iterable%20%3D%20%5B'a'%2C%20'b'%2C%20'c'%5D%3B%0D%0Afor%20%28let%20item%20of%20iterable%29%20%7B%0D%0A%09console.log%28item%29%3B%20%2F%2F%20'a'%2C%20'b'%2C%20'c'%0D%0A%7D%0D%0A&runtime=true)
- [Symbol - MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Object initializer - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer)
- [Method definitions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions)
- [Arrow functions - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

**文章来自 [{{ site.url }}]({{ site.url }})**