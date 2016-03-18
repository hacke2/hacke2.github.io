---
layout: post
title: 译-为你的Node.js配置babel 6
description: "babel 6基础教程"
tags: [Node.js, ES6]
image:
  background: witewall_3.png
comments: true
share: true
---

>原文：http://jsrocks.org/2016/01/configuring-babel-6-for-node-js/

如果你像我一样在你的Node.js应用上还在使用老的ES5 js代码，那么你可以抛弃之前的习惯，现在就可以使用JavaScript ES2015的特性和ES2016的标准在你的Node.js应用上。ES2015和ES2016让JavaScript宛如清风般一样开发，但是，不是每一个ES2015特性在我们心爱的[Node.js](https://nodejs.org)上支持。

这时候[Babel](https://babeljs.io)就派上用场了。<!--more-->Babel是一个让ES2015和ES2016代码转换成ES5甚至是ES3的编译器。简单来说，它会转换你的JavaScript代码，让它在Node.js应用上非常愉悦的用起来。

**小记：** Node.js已经支持多种ES2015的功能，如果你不想转化你的ES2015代码，你可以在启动Node.js是使用 `--harmony` 标签去开启一些已确定标准化的特性。为了使用更多实验性特性可以使用更激进的命令： `node --v8-options | grep harmony` ，但是请注意即便是最新版本的Node.js（在写本文的时候最新版本是5）也不是所有的特性都被支持。这些特性往往是不稳定或不完整的。所以为了保持可读性常常不使用这些特性。

### 下面做一些假设：

- 你了解如何编写[Node.js](https://nodejs.org)应用。
- 你会使用npm来安装软件包。
- 你已经安装了Node.js和npm。
- 你喜欢使用一些命令行命令。
- 最好也了解一点ES2015的语法，当然这个不是必须的。

### 一些例子

有没有一些可运行的例子而不仅仅是阅读代码? 这儿有[可运行的例子](https://github.com/abdulhannanali/babel-configuration-tutorial)

### 安装和开始学习Babel

有很多方法让你可以安装并使用Babel，但这这里我们讨论的是如何让babel-cli运行。

在`code` **文件夹** 下创建一个简单的包含ES2015代码的Index.js文件：

```js
function* jsRocksIsAwesome() {
  yield "JS Rocks is Awesome";
  yield "JS Rocks says JavaScript Rocks";
  return "because JavaScript really rocks";
}

var jsRocks = jsRocksIsAwesome();

console.log(jsRocks.next());
console.log(jsRocks.next());
console.log(jsRocks.next());
```

我们将在下一个命令下安装**babel-cli**。他会在当前项目安装最后一个稳定版本的babel-cli并且也会追加在package.json的devDependencies里。


	npm install --save-dev babel-cli


现在如果你运行


	babel code/index.js -d build/


你将会看见你写的相同代码出现在build/index.js文件夹里，所以Babel的 **插件** 和 **预设** 来临了。

### 插件和预设

babel本身并没有做很多事情，但是通过插件和预设可以实现很多功能。我们希望可以通过babel在我们的代码中使用es2016和es2015所有的优美语法。

为此我们需要安装两个预设文件在 `devDependencies` 里。

- [es2015](https://babeljs.io/docs/plugins/preset-es2015/)
- [stage-0](https://babeljs.io/docs/plugins/preset-stage-0/)

运行下面的命令安装预设文件：


	npm install --save-dev babel-preset-es2015 babel-preset-stage-0

babel拥有广泛的插件在[这边获得](https://babeljs.io/docs/plugins/)

现在你需要在执行命令的时候包含这两个预设。

	babel --presets es2015,stage-0 code/index.js -o build/app.js


现在你会看到正常的ES5代码已经出现在 `app.js`了，它也叫 `编译后的代码` (这是js世界里的一个术语)。你可以使用以下命令运行这些代码：


	node build/app.js

### 使用Babel来配置一个合适的编译环境


这是非常神奇的，但是怎么样才能更好地运用在Node.js开发上？

#### babel的配置文件： .babelrc

`.babelrc` 是一个非常简洁的JSON文件，它可以分离出你的Babel相关的配置。它也是非常易于上手的。以下是本教程的`.babelrc` 文件。

```
{
  "plugins": ["es2015", "stage-0"]
}
```

你可以配置其他[`.babelrc` 选项](http://babeljs.io/docs/usage/options/)，确保它和你一样强大。

对于本教程来说这是非常多的配置。现在，每当我们添加或删除插件，我们仅仅改变以下配置选项而不是去修改他的运行命令，是不是很简单！

现在，如果你运行：

	babel -w code/ -d build/

他会从 `.babelrc` 读取 **预设** 去编译在 `code/` 里的代码并且生成编译好的JavaScript文件在 `build/` 文件夹并且不会结束此命令。注意这个 `-w` 标志：如果你对 `code` 文件夹修改，它会 **监听** 和重新编译这个文件夹下的代码，酷！我现在所说的是不是非常神奇。

#### 使用source maps在你的文件

如果你在思考虽然它非常酷和有趣但是非常难于调试编译后的代码。你不用对此担心。Source maps的思想就是出于这个目的。Source maps会告诉Node.js这个错误的 **源文件** 而不是 **编译后的文件** ！

这边有一个 `code/error.js` 文件会抛出一个异常在生成器的第二次 `yield`后。编译后的代码完全和源文件是不同的。

```js
function* errorFulGenerator() {
  yield "yo";
  throw new Error("source maps are awesome");
  return "";
}

var errorGen = errorFulGenerator();
errorGen.next();
errorGen.next();
```

我们使用如下命令去给 **编译后的文件** 生成 **source maps**。*注意使用`--source-maps` 标签*:


	babel code/ -d build/ --source-maps


现在当我们遇到错误的时候我们会获得有用的调试信息，如下：


	errorGen.next()
	         ^
	
	Error: source maps are awesome
	    at errorFulGenerator (/home/programreneur/Programming/githubRepos/babeljs-short-tutorial/code/error.js:3:9)
	    at next (native)
	    at Object.<anonymous> (/home/programreneur/Programming/githubRepos/babeljs-short-tutorial/code/error.js:10:10)
	    at Module._compile (module.js:425:26)
	    at Object.Module._extensions..js (module.js:432:10)
	    at Module.load (module.js:356:32)
	    at Function.Module._load (module.js:313:12)
	    at Function.Module.runMain (module.js:457:10)
	    at startup (node.js:138:18)
	    at node.js:974:3


这个就是使用 source maps 的方法。

#### 设置npm命令

为了能每一次都非常简单的使用编译命令，你可以更新你的 `package.json` 文件去为Babel加一个构建命令。在 `package.json` 的 `script` 对象你可以如下添加构建命令。


```js
"scripts": {
  "build": "babel -w code/ -d build -s"
}
```

现在，我们运行：


	npm run build


从今天开始就应该全面享受 ES2015/ES2016 带来的好处了！

#### 了解更多关于Babel的知识

这是一个Babel基础教程，但是Babel的世界才刚刚开始。它有给力的社区作支撑并且已经在IT世界有了响当当的名声。Babel也支持大多数构建工具例如[Grunt](https://www.npmjs.com/package/grunt-babel) 和 [gulp](https://npmjs.org/package/gulp-babel/). 你可以在 [Babel Website](https://babeljs.io/docs/setup/)了解到相关信息。

这儿有一些资源可以帮助你在Bable的世界里打怪升级：

- [Learn ES2015 and Babel using this detailed tutorial](http://ccoenraets.github.io/es6-tutorial/index.html)
- [Read the Babel docs on setting up Babel (They're helpful)](https://babeljs.io/docs/setup/)

#### 源码、贡献和感谢

本教程的源码在[这个仓库](https://github.com/abdulhannanali/babel-configuration-tutorial)。

如果你发现一下错别字或者有一些更新，请使用issues或者给[我们的Github 仓库](https://github.com/abdulhannanali/babel-configuration-tutorial)发起PR。

我也非常感谢[Fabrício Matté](http://ultcombo.js.org/) 审阅这篇文章并且把它发布在[JS Rocks](https://github.com/JSRocksHQ/jsrockshq.github.io/) 并且也做了一些更正。

**文章来自 [{{ site.url }}]({{ site.url }})**