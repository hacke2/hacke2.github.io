---
layout: post
title: 译-我是怎么在项目中使用ES6模块化的
description: "如何让ES6 module 和 AMD module一起工作"
tags: [ES6]
image:
  background: witewall_3.png
comments: true
share: true
---

>http://jsrocks.org/2015/05/how-i-m-using-es6-modules-in-production/ 原文链接

我使用 [ES6 modules](/categories/modules/)工作已经有一段时间了，今天我就向大家分享下我是怎么使用ES6 moudule的。

<!--more-->

首先，向大家介绍一下Babel ，[Babel](https://babeljs.io/)是用来JS转译的整合工具，它是一个非常活跃的项目，而且它几乎覆盖了所有现代JavaScript特征。（注：JS转译（Javascript Transpiler）请自行谷歌）
Babel完美支持模块化，你可以自己决定你代码的风格，你可以使用AMD,Common,UMD这些规范，而且你甚至能自定义模块规范。

在我的公司里，我们开发了一个基于AMD modules规范的框架（当然尚未开源），用来构建我们的应用。
相信我：对于开发大型的应用，使用AMD规范仍然是一个很好很好的解决方案。我们不能再把所有js代码反正一个文件里，这样是不行的。
悲剧的是我们现在很多些应用的解决方案是类似于[Webpack](http://webpack.github.io/),要想迁移到AMD modules可不是那么容易，而我们公司关于模块化的解决方案是很实用的（尚未开源）。

注：在本文中“解决方案”都是指JS模块化解决方案。
微模块策略
这个策略对我来说很有用。
正如我上文说的那样，我们最终产出模块必须要要是AMD module，但是当某一个AMD模块需要依赖其他模块时，我叫那个模块（AMD模块依赖的模块）叫做微模块。
微模块并不会被应用的每个模块都用到，但是利用它能帮助我们组织代码。
以下代码演示了我们怎么使用微模块：

## 微模块策略

这个策略对我来说很有用。
正如我上文说的那样，我们最终产出模块必须要要是AMD module，但是当某一个AMD模块需要依赖其他模块时，我叫那个模块（AMD模块依赖的模块）叫做微模块。
微模块并不会被应用的每个模块都用到，但是利用它能帮助我们组织代码。
以下代码演示了我们怎么使用微模块：

{% highlight JavaScript %}
import config from './config';//导入ES6模块
import { globalpkg } from './config';//动态注入ES6模块参数
import factory from './factory';
 
 zaz.use((pkg) => {      
   "use strict";
    config.dynamic.globalpkg = pkg;
    pkg.require(['modFactory'], (modFactory) => {
        modFactory.create(pkg.utils.deepMerge(config._static, factory));     
    }); 
 });

{% endhighlight %}

我们在代码的顶部导入了一些模块，并且在我们的AMD模块里还使用了这些导入的模块。在其他的应用中并不会用到这些ES6模块，但是使用了这些微模块后，编译后产生的最终源码有更高的可读性。

这是config模块的代码：

{% highlight JavaScript %}
const githubURL = "OUR GITHUB URL HERE";
const staticServer = "http://s1.trrsf.com";
const testsPath = `zaz-${type}-${name}/tests/index.htm?zaz[env]=tests`;
const name = "stalker";
const type = "mod";
const version = "0.0.1";
const state = "ok";
const description = "JavaScript API to deal with user data";
let globalpkg = null; // default export 
const config = {     
  _static: {         
  name,         
  version,         
  state,         
  description,         
  docs: `${githubURL}/pages/terra/zaz-${type}-${name}`,         
  source: `${githubURL}/Terra/zaz-${type}-${name}`,         
  tests: `${staticServer}/fe/${testsPath}`,         
  dependencies: ['mod.wilson']     
  }
}; 
export default config;
{% endhighlight %}

这是项目的源码结构：

	└── src
	    ├── _js
	        ├── config.js
	        ├── environment.js
          ├── helpers.js
          ├── factory.js
          ├── methods.js
	        └── mod-stalker.js
	        └── mod-stalker.js


我把一些AMD模块的逻辑放进了微小的ES6模块里。
这对于构建处理是很简单的：Babel转译ES6的Javascript代码为ES5的代码；使用导入CommonJS模块的方式来导入微模块。最后用[Browserify](http://browserify.org/) 打包代码。
哈哈！最终生成的代码符合AMD模块规范了。

## 下一步

Sourcemaps比起Browserify来说，Sourcemaps不能很好的处理这个编译的流程。
也许这里能有更好的实现方式。
我们现在可以开始使用ES6新特征和模块化来重构我们的框架了。
你甚至可以自己实现模块加载规范给你的程序，但是我认为这可能不是一个好方法，有可能你会需要完全重写现有的模块加载系统。

## 结论

现在模块规范已经完成了，而且是非常成熟和有效的。
然而，web浏览器至今没有提供js模块加载的原生API,所有像AMD或者CommonJS就显得格外重要了。
现在我们已经体会到ES6模块语法的好处了，可以让我们的代码拥有更高的可读性和简洁性。
现有的工具，比如Babel和Browserify能减少我们开发的痛苦，相信在不久的将来等ES6普及后，我们就能简化js开发流程，这样就能舍弃这些构建打包工具了。


**文章来自 [{{ site.url }}]({{ site.url }})**