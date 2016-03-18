---
layout: post
title: 使用Node.js生成一个静态博客
description: "静态博客wooden编写记录"
tags: [Node,Javascript, ES6]
image:
  background: witewall_3.png
comments: true
share: true
---

>我github star最多的是我的博客,是用Ruby写的Jekyll搭建的，运行在支持它的gthub上。Jekyll很方便的一点是可以用markdown来编写你的博客，有一种极客的感觉。但是用Node.js怎么实现一个静态博客系统呢？

<!--more-->

![github](http://ww2.sinaimg.cn/large/8ae515a4jw1ey4ctqpvhaj20sc02m0sz.jpg)

## 生成模板

首先要解决的问题是怎么用命令行来做一些操作。我打算用命令行生成模板，有一个模块`commander`实现很方便。
定义一个帮助命令

```js
program
	.command('help')
	.description('show help')
	.action(() => {
		program.outputHelp();
	});
```

在定义其他命令

```js

program
	.command('create [dir]')
	.description('create empty project')
	.action(require('../lib/create'));

program
	.command('preview [dir]')
	.description('preview your web page')
	.action(require('../lib/preview'));

program
	.command('build [dir]')
	.description('build the project to HTML')
	.option('-o, --output <dir>', 'build the project dir')
	.action(require('../lib/build'));

program.parse(process.argv);

```

我们定义了三条命令:

1. 创建
2. 预览
3. 生成

## 创建

在创建的时候会把之前的一些模板文章生成到用户文件下，因为本模块是安装在全局的，运行该命名会把一些静态资源文件、模板、配置文件等输出出来供用户修改。

```js

try {
	  	//create template dir
		fse.mkdirsSync(path.resolve(dir, '_layout'));
		fse.mkdirsSync(path.resolve(dir, '_post'));
		fse.mkdirsSync(path.resolve(dir, 'assets'));
		fse.mkdirsSync(path.resolve(dir, 'posts'));

		// 复制模板文件
		let tplDir = path.resolve(__dirname, '../tpl');
		fse.copySync(tplDir, dir);

		console.log('create success!');
	}catch(e) {
		console.log('create faild!');
		console.error(e);
	}
	
```

## 预览

预览就是用express启动一个web项目。开启一个Node.js web项目最简单无异于是用express框架了。我是用jade当做模板引擎，因为其提供的block和include实在是太强大了。

```js

	let app = express();


	app.use('/assets', express.static(path.join(__dirname, '../assets')));
	
	app.set('port', (process.env.PORT || 3000));

	app.set('views', path.join(__dirname, '../_layout/pages'));
	app.set('view engine','jade')
	
```

我们设置好静态目录和模板引擎，就可以编写重要的路由了。在一个简单的博客系统，无外乎有两个重要的路由：

* 首页
* 文章详情页

对应路由如下：

```js
//render index
	app.get('/', (req, res, next) => {
		//...
	});

//render article
app.get('/posts/:articleName', (req, res, next) => {
	//...
});
```

最后，我们想启动的时候就能打开默认浏览器，这里，我参考了一下[新杰的代码](https://github.com/freeyiyi1993/mobile-test/blob/master/server.js#L25)：

```js
// open browers
	app.listen(app.get('port'), () => {

		let cmd = 'open "http://localhost:' + app.get('port') + '/"';

	    child_process.exec(cmd, (err, stdout, error) => {
	        if(err) {
	            console.log('error:' + error)
	        } else {
	            let url = 'http://localhost:' + app.get('port') + '/'
	            console.log('Server started: ' + url)
	        }
	    })
	})
```

### 解析markdown

解析markdown Node.js已经提供了封装好得模块`markdown-it`，我们设置参数调用就可以直接调用。

```js
let md = new MarkdownIt({
    html: true,
    langPrefix: 'code-',
});
```

一篇文章应该有他的一些特征，比如像Jekyll一样：标题、标签、背景图等。

我在markdown下有如下设置：

```html
---
title : 我是标题
---
```

然后需要有一个[函数来解析](https://github.com/hacke2/wooden/blob/master/lib%2Futils.js#L55)

最后得到标题，我们命名文章的规则是日期+标题，和jekyll一样。

也需要解析一下

```js
let getArticleDate = title =>{
    let arr = title.split('-'),
    result = [];

    for (let i = 0; i < 3; i++) {
        result[i] = arr[i];
    }
    return result.join('-');
}
```

### 异步调用

我们得到数据后，会将它给到jade，这是一个异步的过程，我用`Promise`来封装

下面是的获取首页

```js
let getArticle = name => {
    return new Promise((resolve, reject) => {
        
        let file = path.join(process.cwd(), '_post', name + '.md');
        fs.readFile(file, (err, data) => {
            if(err) {
                reject(err);
            }else {
                let article = parseSourceContent(name, data.toString());
                let html = md.render(article.content);
                resolve({
                    name : config.name,
                    contact : config.contact,
                    title : article.title,
                    content : html,
                    date : article.date,
                    href : article.href
                });
            }
        });
        
    })
}
```

下面是的获取某一篇文章

```js
let getArticle = name => {
    return new Promise((resolve, reject) => {
        
        let file = path.join(process.cwd(), '_post', name + '.md');
        fs.readFile(file, (err, data) => {
            if(err) {
                reject(err);
            }else {
                let article = parseSourceContent(name, data.toString());
                let html = md.render(article.content);
                resolve({
                    name : config.name,
                    contact : config.contact,
                    title : article.title,
                    content : html,
                    date : article.date,
                    href : article.href
                });
            }
        });
        
    })
}
```

### 渲染jade

jade提供个强大的include 和 block。我们创建一个框架，其他页面继承它。

```jade
doctype
html
	head
		meta(charset="utf-8")
		meta(name="viewport",content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no")
		title #{name}
		include ./includes/css
		block page_css
	body
		include ./includes/header
		block content
		include ./includes/js
		block page_js
```

它包含css模板和js模板，页面放在content里

```jade
block content
```

首页来继承它

```jade
extends ../layout

block page_css
	link(href="assets/css/base.css",rel="stylesheet")
	link(href="assets/css/index.css",rel="stylesheet")

block content
	h1.site-name #{name}
	article.container
		ul.article-list
			each article in articleList
				li(class="article")
					a(href="#{article.href}#{isBuild ? '.html' : ''}", class="article-title") #{article.title}
					div.abstract #{article.abstract}
```

文章列表也也是如此，在此不展开了。

可以看出，预览是比较重要的一步，生成也是基于它来运作的。

## 生成

我们在创建新的md文件后，需要将它编译成html，也是调用之前预览的方法来生成html。

```js
utils.getIndexData().then(data => {

		data.isBuild = true;
		
		console.log('build ' + path.join(viewPath, 'index.jade'))
		let html = jade.renderFile(path.join(viewPath, 'index.jade'), data);
		fse.outputFileSync(path.join(outputDir, 'index.html'), html);
	});
	
	//build post
	utils.getFileList().forEach(filePath => {
		let fileName = path.basename(filePath, '.md');
		utils.getArticle(fileName)
			.then(data => {
				console.log('build ' + path.join(viewPath, 'post.jade'))
				let html = jade.renderFile(path.join(viewPath, 'post.jade'), data);
				fse.outputFileSync(path.join(outputDir, 'posts', fileName + '.html'), html.toString('utf-8'));
			});
		
	});
```

## 发布

想让这个命令不是用Node xxx.js来运行，直接是用xxx来运行，需要在bin目录下创建一个文件，将commande这个入口js拷进去，然后在开头输入

```shell
#!/usr/bin/env node --harmony
```

因为此项目运用了es6的一些特性，需要使用`--harmony`来开启支持。

最后，使用`npm publish`发布，我已经将它发布在npm上了，起名`wooden`[https://www.npmjs.com/package/wooden](https://www.npmjs.com/package/wooden)。将一个demo部署在了开发机上[http://fe.sm.cn/xinglong.wangwxl/wooden/](http://fe.sm.cn/xinglong.wangwxl/wooden/)


![WOODEN](http://ww3.sinaimg.cn/large/8ae515a4jw1ey4cjpkywzj20xl0bkwf9.jpg)

## 遇到的一个坑

之前写项目都是用`__dirname`找当前目录，但是使用这种直接命令这种方式`__dirname`找到的是全局安装的路径，并不是当前命令执行的路径，最后路径会找不到，可以使用`process.cwd()`来找到当前命令执行的路径。

本文就此完毕，是不是和我现有博客的架构挺像？

项目地址：[https://github.com/hacke2/wooden](https://github.com/hacke2/wooden)

**文章来自 [{{ site.url }}]({{ site.url }})**