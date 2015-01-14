---
layout: post
title: 译-使用6to5，让今天就来写ES6的模块化开发！
description: "ES6 modules today with 6to5"
tags: [翻译]
image:
  background: witewall_3.png
comments: true
share: true
---

>http://es6rocks.com/2014/10/es6-modules-today-with-6to5/?utm_source=javascriptweekly&utm_medium=email 原文链接

我之前在Twitter上发过一个照片，表达出我有多快乐，这像是一个时光机让我们可以穿梭到未来-ES6的时代！下面让我来展示如何使用6to5让今天就可以练手ES6的模块化。

<figure>
	<a href="http://es6rocks.com/img/modules-today-6to5.png">
		<img src="http://es6rocks.com/img/modules-today-6to5.png" alt="home" />
	</a>
	<figcaption>使用6to5让今天就可以练手ES6的模块化</figcaption>
</figure>

<!--more-->

# 第一步

如果你现在还不了解ES6的模块化开发，请在[JSModules.io](http://JSModules.io)上了解一下。我也推荐大家读一下@jcemer的文章[A new syntax for modules in ES6](http://es6rocks.com/2014/07/a-new-syntax-for-modules-in-es6/)，它涉及到了很多非常酷的关于JS模块化的东西。他可以指导我们使用6to5。总的来说，6to5能在支持ES5d的环境下提前尝试ES6 模块化开发的快感。
6to5比其他降级工具有一下几个优势：
 * 可读性：你的格式化的代码尽可能的保留。
 * 可扩展性：有非常庞大的插件库和浏览器的支持。
 * 可调式性：因为支持source map，你可以方便的调试已经编译过后的代码
 * 高效率：直接转化为与ES相当的代码，不会增加额外的运行十几

# 一起来写模块

让我们来尝试着写模块吧！
我们的应用除了输出日志不会做其他事情，其主要的目的就是让你了解模块化如何工作和如何让你现有的环境使用ES6的模块化开发。
基本的目录结构：

	├── Gruntfile.js
	├── package.json
	└── src
	    ├── app.js
	    ├── modules
	    │   ├── bar.js
	    │   ├── baz.js
	    │   └── foo.js
	    └── sample
	        └── index.html

app.js是主程序，包含了我们将要存储的模块化的目录
下面是app.js的代码：

{% highlight JavaScript%}
import foo from "./modules/foo";
import bar from "./modules/bar";

console.log('From module foo >>> ', foo);
console.log('From module bar >>> ', bar);
{% endhighlight %}

以上代码非常简单，我们导入了foo模块和bar模块，然后分别打印出他们

{% highlight JavaScript%}
// foo.js
let foo = 'foo';

export default foo;


// bar.js
let bar = 'bar';

export default bar;
{% endhighlight %}

在这些模块一面我们只是导出了两个字符串'foo'和'bar'，当我们导入这些模块，我们的变量其实已经有数据。
当然，我们何以导出对象，类，函数，等等
现在，你可以开始模仿这个例子写出你自己的模块

# 构建

就像你已经知道的，[ES6不支持你现在的浏览器和Node](http://kangax.github.io/compat-table/es6/).js，只有一条路，那就是使用降级转换器来编写ES6的模块化代码。
正如我之前提到的那个，我使用6to5，他可以精确的达到我们想要的效果。
这个任务是运行在Grunt上的,我们使用 @sindresorhus的 [grunt-6to5](https://github.com/sindresorhus/grunt-6to5)

{% highlight JavaScript%}
npm install grunt-cli -g
npm install grunt --save-dev
npm install grunt-6to5 --save-dev
{% endhighlight %}

我们的Gruntfile类似于一下：

{% highlight JavaScript%}
grunt.initConfig({
    '6to5': {
        options: {
            modules: 'common'
        },

        build: {
            files: [{
                expand: true,
                cwd: 'src/',
                src: ['**/*.js'],
                dest: 'dist/',
            }],
        }
    }
});
{% endhighlight %}

To test it in the browser, I made a copy task that just copies the sample/index.html file to our dist directory.
The HTML file looks like this:

这是个简单又给力的配置，我们也几乎完成了。
当你指定好源文件和输出文件后，这个任务就可以来运行了。
'common'选项的目的在于告诉6to5我们将输出ES5CommonJS模块化风格。
当然，6to5也支持AMD，我写了sample/index.html，让他在浏览器环境下测试一下，这个HTML的代码如下：

{% highlight HTML%}
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ES6 modules 6to5</title>
</head>
<body>
    <script src="//[cdnjs URL]/require.min.js"></script>
    <script>
        require(['app.js']);
    </script>
</body>
</html>
{% endhighlight %}

观察上面的代码，我们使用AMD的RequireJS框架来加载这个JS，对于这个例子，你需要将上面的配置文件改为 modules: 'amd'

# 运行

万事俱备东风只欠，我们的代码已经放在[es6-modules-today-with-6to5](https://github.com/es6rocks/es6-modules-today-with-6to5)，你可以克隆下来自己玩玩。使用npm install安装6to5

记住一点，Grunt任务会生成一个目标文件夹来存放转化后的代码
所以，如果你想测试使用CommonJS规范的转化后的ES6的代码，你可以执行一下命令

node dist/app.js

<figure>
	<a href="http://es6rocks.com/img/running-node.png">
		<img src="http://es6rocks.com/img/running-node.png" alt="home" />
	</a>
	<figcaption>Node.js上的运行效果</figcaption>
</figure>

如果你使用AMD规范的，请在浏览器访问index.html(**吐槽一下，老外竟然不知道中国的[sea.js](https://github.com/seajs/seajs)**)

<figure>
	<a href="http://es6rocks.com/img/amd-es6.png">
		<img src="http://es6rocks.com/img/amd-es6.png" alt="home" />
	</a>
	<figcaption>在浏览器执行的效果</figcaption>
</figure>

# 结论


通过这个简单的实例你学会了如果简单的使用ES6模块化风格来编写代码。6to5是胃肠棒的工具让你穿越到未来提前体验ES6模块化带来的快感。资源下载[es6-modules-today-with-6to5](https://github.com/es6rocks/es6-modules-today-with-6to5)，欢迎提交一些问题的反馈


**文章来自 [{{ site.url }}]({{ site.url }})**