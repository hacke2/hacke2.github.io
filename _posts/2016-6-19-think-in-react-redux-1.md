---
layout: post
title: React + Redux 入门（一）：抛开 React 学 Redux
description: "redux 入门"
tags: [Redux, React]
image:
  background: witewall_3.png
comments: true
share: true
---

## redux简介

Redux 是一个改变状态(state)的模型，这个模型通过一个单向操作的方式来改变状态。现在网上教程一言不合上来就是 Redux + React 的综合运用，经常搞的人一脸懵逼。其实 Redux 和 React 完全解耦，并不是 Redux 非得和 React结合才能使用，而只是 React 结合 Redux 会事半功倍。本系列主要也讲得这个。

对于日益复杂的 Javascript 应用来说，Javascript 需要管理非常多的 state。包括本地尚未持久化到数据库的数据、UI状态等等，而且这些状态有可能是相互关联的，一个状态的改变可能会引起另外一个状态的变化，如果用命令式编程将会变得异常复杂以及难以维护。Redux 作为一个专门关联 state 的框架应用而生，而这种单向数据流的思想也让 Redux 成为一个现代框架。

<!--more-->

![](http://img4.tbcdn.cn/L1/461/1/3db24afe31e7218b4ac6cc74497204250b2f5f3a)

redux介绍

### redux三大原则

Redux 有三大原则：

- 单一数据源
- state 只读
- 只用纯函数来修改

### 单一数据源

整个应用的 state 都是保存在一个对象树中，而且这个对象树存在唯一一个 store。这个 store 我们通过`redux.createStore创建`，通过以下代码获取：

```js
store.getState()
```	

### state 只读

改变 state 只能通过 dispatch 一个 action 才能修改。

action 其实就是一个简单对象，其中type是必填项，以便 区分是哪一个 action。

```js
store.dispatch({
  type: 'ALL'
});
```

为了方便给 action 传递数据，一般来说我们会把上边参数对象封装成方法。如：

```js
const create = (item)=> {
	return {
		type: 'CREATE',
		item
	}
}
```

即便在小的功能也得这样修改 state。比如实现表单的双向绑定。我们给一个input绑定一个在`onChange`事件，然后在`onChange`里拿到当前的 value，dispactch 一个 action 通知 reducer 改变给当前 dom 绑定的state(根据props传递)，这样才能实现双向绑定。


### 使用纯函数来执行修改

何为纯函数？简单来说就是函数的输出完全由输入所决定，运行过程不依赖于系统的状态和上下文环境，运行过程不改变它作用域之外的环境状态。详情可以参考月影的：[高阶函数对系统的“提纯”](https://www.h5jun.com/post/higher-order-function-play-with-pure-function.html)

这个纯函数在 Redux 里叫做 Reducer，它接收先前的 state 和 action，并返回一个新的 state，由于它是纯函数，所以它的结果是可预测的，这样为编写单元测试创造了条件。

### 一个实例

介绍完三大原则，我们认清了redux的三个非常重要的组成部分：

- action
- reducer
- store

action 通知 reducer 修改 state，store 管理 state。非常简单。介绍一个非常简单的demo：

运行环境： node v6.1.0

```js
const redux = require('redux');
const createStore = redux.createStore;

const ActionType = {
	ADD: Symbol()
}
```

首先我们引入 Redux后，编写一个简单的常量类，这个类里存储着一些不同的类型。注意一般会使用字符串来区分，为了避免出现无意义的字符串，我们使用 ES6 的 `Symbol`。

我们定义一个元素初始状态的 state：

```js
let initState = {
	products: []
};
```

接下来，我们就可以写一个 action，比如新增产品

```js
const addProducts = (product)=> {
	return {
		type: ActionType.ADD,
		product
	}
}
```

我们现在需要一个 reducer 来改变我们的状态

```
const getProducts = (state=initState, action) => {
	switch(action.type) {
		case ActionType.ADD : 
			return Object.assign({}, state, {
				products: state.products.concat(action.product)
			});
		default : 
			return state;

	}
}
```

然后将 reducer 放入 store 中进行测试

```js
let store = createStore(getProducts);
console.log(store.getState());

store.dispatch(addProducts(1));
console.log(store.getState());
```

输出结果

```js
{ products: [] }
{ products: [ 1 ] }
```

注意：分析 createStore 的源码可知，在初始化的时候他自己会 dispatch 一个 action：

```js
export var ActionTypes = {
  INIT: '@@redux/INIT'
};

```

会对当前 state 初始化。

至此，我们使用 Redux 编写了一个无 React 的例子。也对 Redux 有了一个基本的认知。

**文章来自 [{{ site.url }}]({{ site.url }})**