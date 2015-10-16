---
layout: post
title: 最近做的Node.js项目总结
description: "内部项目动效平台总结"
tags: [Node.js]
image:
  background: witewall_3.png
comments: true
share: true
---

>上个月我们神马这边第一次尝试了用Node.js写项目：**动效平台**，前端工程师负责从前到后的所有流程。当然，这是一个内部项目，目前还是积累Node.js方面的知识，为以后迎接更大的项目做准备。

<!--more-->

## 项目介绍

我们做的东西是类似于[codepen](http://codepen.io/)或[jsbin](http://jsbin.com/)这样的东西。

![项目截图](http://ww1.sinaimg.cn/large/8ae515a4gw1ex2qug42i9j21kw0t1jwy.jpg)

做改内部系统的目的主要基于以下考虑：

1. UE同学需要有个这样的平台来规范一些样式
2. 动效组同学也可以通过这个平台来展示一些组件分享给大家来学习、调试
3. 前端同学可以把组件上传到上面一目了然，再也不用去

为上面要重复造轮子呢？我认为有以下三点：

1. 特殊的定制化：[jsbin](http://jsbin.com/)不会有产品线、类型这些功能，也没有可以上传一些PSD和PRD的途径。
2. 学习Node.js：如今不会Node.js都不好意思说自己是前端工程师，就算你不做全栈，懂一点Node.js也是很不错的。更何况我们利用这个项目学习Node.js，为了以后迎接机会做好准备。
3. 跨部门的合作：神马书旗前端团队合并为大前端组，成员之间其实还是缺乏沟通与相互学习，本次项目前端由书旗同学负责，后端和数据库由神马同学负责，加强了两个部门之间的沟通。

每一个组件所属分类，而分类又所属在产品线（神马、书旗）下。每一个组件也有其对应的历史版本。

## 架构

项目架构是由明智完成，工程化这边使用了[fis](https://github.com/fex-team/fis)来编译js和css。使用[bower](https://github.com/bower/bower)管理前端类库。web框架基于[express](https://github.com/strongloop/express)，使用[log4js](https://github.com/nomiddlename/log4js-node)来管理输出的日志。模板使用[ejs](https://github.com/tj/ejs)，因为我们前端模板使用[underscore](https://github.com/jashkenas/underscore)模板，所以减少了学习成本。使用[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)来处理异步回调。


整体上，项目使用MVC架构，分为以下几层：

1. 视图层：负责渲染模板。
2. 路由层：负责路由的跳转逻辑。
3. 控制层：负责每个路由的处理逻辑，主要业务也在这层。
4. 数据处理层：负责与数据库打交道，为了更好的扩展性（线上换数据库）和方便性（不用写简单SQL）这里我们使用Node中得ORM库[orm2](https://github.com/dresende/node-orm2)
5. 模型层：因为使用ORM操作数据库，所有的操作都是基于对象的，这一层是这个项目的基石。

除了以上几个层外，还有工具库，里面包含了文件的操作，相对路径的获得、SASS的编译、XSS的过滤等。


![架构图](http://ww1.sinaimg.cn/large/8ae515a4jw1evwkb97qvjj20sg0lcdi6.jpg)

项目前端使用[Angular.js](https://github.com/angular/angular.js)来组织代码。前端支持使用scss来书写样式，通过ajax来编译。下面介绍以下后端各层的核心代码和层与层之间的交互。

## 路由层

路由层主要是处理不同的路由，我们路由层依赖控制层的代码。同事也放了一些自定义的中间件。

{% highlight JavaScript %}

module.exports = function(app) {

    app.use('/public/upload', function(req, res, next) {
        res.setHeader('Content-Type', 'application/octet-stream');
        next();
    });

    // 首页
    app.get('/', PageController.redirectWelcome, ComponentController.renderIndexPage);
    // 编辑组件页面
	//...
	
{% endhighlight %}

我们将文件上传到静态目录`public`下的`upload`里，测试的时候发现打开图片、txt文件浏览器直接想解析了，后来解决方案是响应的时候得加个头部内容，告诉浏览器访问这个路由以文件的方式下载而非在浏览器直接打开。

一些依赖产品线路由我们加了个中间件验证，若无产品线则跳到欢迎页让其选择产品线。

## 控制层

控制层使我们核心业务处理，根据不同的情况来调用不同的数据处理层，比如编辑一个组件，如果没有修改组件，那么不新增组件历史版本，若修改则新增，等等。

下面试新增组件方法：

{% highlight JavaScript %}

//创建组件、组件项
function createComponent(data, files) {
    //组件
    var component = new Component(...);
    //历史版本
    var componentHistory = new ComponentHistory(...); 
    //首先保存到数据然，然后再保存到文件中
    return Promise.all([
            //存入数据库的方法
        ]);

}

{% endhighlight %}

所有异步操作完成后，我们会将数据传给view层来渲染，这样就完成了

>V→C→M→C→V

这样一个MVC处理思想。下面数渲染的逻辑

{% highlight JavaScript %}

 renderCreationPage: function(req, res) {
    var productLineID = req.cookies.productLineID;
    Promise.all([
        //查询数据库
    ]).then(function(result) {
        res.render(AppUtils.getViewPath('component/create.ejs'), {
            //传入数据
        });
    }).catch(function(e) {
        res.redirect('error');
    });
},

{% endhighlight %}

## 数据处理层

我们使用ORM数据库来建表，但是我感觉如果想在数据库大量优化则第一次使用ORM来建表，优化那些不必在是ORM负责。

{% highlight JavaScript %}

var ComponentTable = db.define('component', Component.getType(),{
    cache   : false
});

{% endhighlight %}

这边遇到了一个坑，他默认有对缓冲，这样如果是调用他的get方法的话，修改数据库并不能实时的展示，必须重启Node应用才可以，直接执行SQL无影响。索性将其cache关闭。

框架支持自动建表，剩下了不少麻烦

{% highlight JavaScript %}
//同步表
ComponentTable.sync();

{% endhighlight %}

当然这个方法是异步方法，但不可能项目刚启动就有对数据库的操作，搜易偷了个懒这样写。其实是有问题的，但不知如何解。

操作数据库的方法我就不一一写出了，我写了个[orm的Demo](https://github.com/hacke2/node-orm2-mysql-demo)便于参考，官网上也很详细。

对于复杂sql我们只能手写。比较复杂的SQL,框架也是支持直接调用，但这样使用Mysql驱动来写，也是不能跨数据库，这也是一个弱点。

{% highlight JavaScript %}

db.driver.execQuery(getComponentHistoryByComponentHistoryIDSQL,  [componentHistoryID], function(err, data) {
    if(err) {
        console.error(err);
        reject(err);
    }else {
        resolve(data);
    }
});

{% endhighlight %}

查询出得数据库是一维数据，还需要我们组装才能给前端，我们减少了一层业务逻辑层，组装还是写在了数据处理层中。

## 模型层

模型层为类的定义，因为orm建表需要知道每一个类的类型，所以还需为其提供：

{% highlight JavaScript %}

var Component = function(name, categoryID, userID, remarks, productLineID) {
    var now = new Date();
    this.componentID = uuid.v4();
	//...
};

Component.getType = function() {
    return {
        componentID : String,
        createTime : {
            type : 'date',
            time : true
        },
        status : Number
        //...
    }
};


{% endhighlight %}

当然，框架支持建立索引、默认值等:

{% highlight JavaScript %}

var Person = db.define('person', {
    id: {type: 'serial', key: true},
    id_num: {type: 'text', unique: true, required: true},
    name: {type: 'text'},
    sex: {type: 'enum', values: ['m', 'f'], defaultValue: 'm'},
    age: {type: 'number', defaultValue: 1}
  });
  
{% endhighlight %}
## 展望与不足

这个项目马上就要完成了，我觉得我们接下来要准备的又以下几点：

1. 技术应该激进一点，因为在服务端编程正好是学习的一个好机会，何不在上面使用ES6、ES7？异步直接使用await来处理异步。
2. Node端需要一套完整的工程化的东西，压缩、合并、校验、打包、发布与上线、负载均衡，这些都是要考虑的。也希望工程化的同学能在这边帮帮我们。
3. 服务端代码不同于前端代码，需要严格的测试，希望我们这边在单元测试、集成测试上也能有所进步，而不是人工的点一点。
4. 在性能方面我们现在还不能保证代码嫩那个高效的持续运作。如何让自己的项目在线上稳定的跑一年？Node端内存泄露问题应该要有很好的排查、解决方案这块也是我们接下来要学习的。
5. 以后外部项目可能会做一些打点统计方案、数据可视化，这也是现在欠缺的。
6. 用户系统需接入集团的SSO

这是我们前端第一次负责整个项目，从前到后，使用Node.js来编写服务的代码，所以其中还是有几块不足的地方：

1. 之前按照JAVA分层的方式来编写，将数据处理和模型层分开，但阅读其他Node.js项目，都是模型和数据处理混合在一个文件，后来想了想，也许是Javascript语言的特性吧，随时随地可以给一个类加一个熟悉，不是JAVA这种强类型定好类就不能变，也许是自己的JAVA情节，以后开发Node.js项目还是按照Node的方式来处理。
2. 项目开始的比较急，做需求时并没有画出完整的原型，这样对于设计数据库来说是非常吃力的，要考自己的脑补才能完成，感觉有点累，而且没有原型的规定，这个到底展示什么数据也是做完才说明，比如该展示组件生成时间还是展示组件升级说明，公说公有理婆说婆有理，如果原型定好后编写对谁都方便。


## 总结

项目还算比较顺利的到了尾声，想起我们一起去阿里拌面吃过的拉条子和撸过的串，还是比较怀念的。这只是我们的第一步，虽然目前Topic只有我一个人在杭州，沟通起来是有些成本，但是还是希望能和大家一起进步！朝着全栈的路上，猛进！

**文章来自 [{{ site.url }}]({{ site.url }})**