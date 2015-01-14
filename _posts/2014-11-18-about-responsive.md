---
layout: post
title: 响应式Web初级入门
description: "关于响应式编程的一些思考"
tags: [移动Web]
image:
  background: witewall_3.png
comments: true
share: true
---

## 跨终端时代的到来

当你乘坐各种交通工具(公交、地铁、轻轨、火车)时你会发现，人们都个个低下头在玩自己的手机、平板、Kindle，没错，你正在处于一个多终端设备的时代！手机用户连年上升，前几天我们在感叹以前玩沙包、陀螺，现在小孩的娱乐就是玩手机--。另外，微软的Xbox和任天堂的Wii等游戏设备也有自己的浏览器。设备真的来了。。

<!--more-->

现在网站主流跨终端的有以下方式：

### 单域

比如[前端乱炖](http://www.html-js.com/)和[我的个人博客](http://www.hacke2.cn)都属于此一类。此类网站具有只编写一次就能实现跨终端的需求，维护起来相当方便。但缺点也很明显，加载不必要的JS和CSS比往常相比巨多。

单域还有一种情况，就是多个模板，你用移动设备可能访问一个网站，最底下会有访问桌面版，访问触屏版等，他会重新加载模板。

<figure>
	<a href="/images/article/2014-11/git.png">
		<img src="/images/article/2014-11/git.png" alt="home" />
	</a>
	<figcaption>提示访问移动版</figcaption>
</figure>

<figure>
	<a href="/images/article/2014-11/git2.jpg">
		<img src="/images/article/2014-11/git2.jpg" alt="home" />
	</a>
	<figcaption>随之进入移动版，HTML结构也会发生变化</figcaption>
</figure>


### 多域

如[神马搜索](http://m.sm.cn)和百度(http://www.baidu.com)，当用桌面浏览器和移动浏览器访问的结果是不一样的。其中的手段可能有两种：

* [Ngix反向代理判断](http://blog.csdn.net/fairplay_li/article/details/13769393)
* 服务端直接判断UA输出不同的界面，[JAVA和PHP等后台语言都提供了支持框架](https://github.com/tobie/ua-parser)

两家都对移动端做了专门的页面，这样进行功能的拆减，用户体验当然大大提高，但有需求发生变化时，往往要更改两处地方。

### 多终端

也就是前端最不想看到的，很多公司为了提高更好地用户体验都使用native开发，如IOS的OC,SWIFT，Andriod SDK等。功能强大，接口丰富，缺点就是更新起来异常困难，很多用户都不想过几天就安装一个APP。

**本文主要讲第一种`单域(响应式)`的情况**

### 响应式Web

响应式Web设计最早在2010年EthanMarcotte发表过一篇文章[《Responsive Web Design》](http://www.alistapart.com/articles/responsive-web-design/)，**基本每本将响应式的书籍都将他提起，那个例子太经典**提起，文中援引了响应式建筑设计的概念：

>最近出现了一门新兴的学科——"响应式建筑(responsive architecture)"——提出，物理空间应该可以根据存在于其中的人的情况进行响应。结合嵌入式机器人技术以及可拉伸材料的应用，建筑师们正在尝试建造一种可以根据周围人群的情况进行弯曲、伸缩和扩展的墙体结构；还可以使用运动传感器配合气候控制系统，调整室内的温度及环境光。已经有公司在生产"智能玻璃"：当室内人数达到一定的阀值时，这种玻璃可以自动变为不透明，确保隐私。

澄清一点，**响应式站点不等同于移动站点**，他只是一种开发移动站点的策略。其实按照这个说法[神马搜索](http://m.sm.cn)是一款纯粹的移动WEB APP，因为它没有桌面版。

<figure>
	<a href="/images/article/2014-11/sm.jpg">
		<img src="/images/article/2014-11/sm.jpg" alt="home" />
	</a>
	<figcaption>为移动而生，专注移动搜索的神马搜索</figcaption>
</figure>

## 三种布局方式

现存的布局哪一种更加适合做响应式的网站呢？一般来说有以下三种布局：

### 固定布局

应该是新手开发人员最喜欢用的布局方式，简单粗暴，设计稿是多少PX，写CSS时就多少PX，对页面的控制力度是最强的，上下级没有联系，想调哪个就调那个，如果设置`box-sizing:border-box;`,甚至对整个布局都没有影响。

最常见的就是`body`使用`960px`的像素，有以下两个因素：

* 适应正方形的老式屏幕；
* 两边补白，让宽屏用户不觉得那么聚集；
* 960可以被3、4、5、6、8、10、12、15整除。

[点击戳DEMO](/demo/2014-11/ali-px.html)

但问题是这么做毫无响应式可言，会出现很恶心的`横向滚动条`，另外，移动端的浏览器会默认的将网页缩小，根本`无多终端性`可言。

### 流式布局

在流式布局中，度量单位不再是简单的像素，而是百分比。这使得页面具有可变性。

[点击戳DEMO](/demo/2014-11/ali-percent.html)

当缩小浏览器边框时，`万恶的横向滚动条`消失了。缺点就是有些文本的行宽会看起来太宽，而在小屏幕看起来太窄

当然，在良好的支持CSS3的移动浏览器下，使用`flex布局`更加有优势！

### 弹性布局

这次度量单位又变了，通常情况以em为单位，但是em太依赖于父级，好在CSS3提供了更好的`rem方式`(这个demo找的不好，因为table表格本来就有流动的属性`display:table;display:table-cell;`)。

[点击戳DEMO](/demo/2014-11/ali-rem.html)

其实细想一下，**选择布局方式其实是对`度量单位`的选择!**

另外还有`网格布局`方式，bootstrap就是采用12栅栏布局，另外前不久winner也谈了一些淘宝提供的可伸缩布局方案：[lib.flexible](https://github.com/amfe/lib.flexible)，按照DEMO来看，其使用的是`rem`方式，在改变视窗大小的时候动态的改变基准的比例(浏览器默认是`16px`，设置器基准大小为`62.5%`)。还有人提出来的`混合布局`，但无论哪一种，都离不开上面`固定布局`,`流式布局`,`弹性布局`,三种的支撑。

综上所述，`流式布局`或`弹性布局`或许是响应式布局的更好方式。

## 媒体查询

难道有`流式布局`或`弹性布局`就够了吗？就像一个屌丝升职加薪就够了？不当上CEO怎么赢取白富美？

媒体查询可以让你根据在特定环境下查询到的各种属性值-比如`分辨率`，`色彩深度`，`高度和宽度`(包括设备宽度与视觉宽度)，`横向纵向`,`设备像素比`来决定应用什么样的样式。

我们可以看到我们上面的那些DEMO(我承认这个DEMO找的不好，是从今年阿里校招题目里面抠出来的)，当我们改变浏览器大小时，左边的列表实在是太丑，但是使用媒体查询后的效果就不一样了。

[点击戳DEMO](/demo/2014-11/ali-media.html)

### 媒体查询的语法

语法很简单


	@media [not|only] type [and] [expr] {
		rules
	}

解释一下：

* not|only：逻辑关键字
* expr：媒体表达式
* type：媒体类型
* rules：CSS样式



1.逻辑关键字

有and,not,or,only等，前三个不多说，最后一个是因为很多较老的浏览器支持媒体类型，却不支持媒体查询，有时候导致浏览器去尝试下载那些你不希望用户看到的样式。

2.媒体表达式

表达式支持的也很多，这里也不列举了，重点有:
* 表示**显示区域**的`width`和`height`
* 表示**设备区域**的`device-width`和`device-height`
* 表示**横屏还是竖屏**的`orientation`
* 表示**设备像素比**`device-pixel-ratio`

3.媒体类型

媒体类型有很多，感兴趣下来查一下，这里就不列举了，一般大多网站设置的是screen，如不你嫌麻烦可以什么都不写(默认为all)，支持所有设备。

4.规则

就是你想要在这个环境下想展示出的CSS

下面一个简单的示例：

{% highlight CSS %}
@media sreen and (min-width: 320px) {
	
}
{% endhighlight %}


另外，媒体查询也可以使用在外部样式上，如：

{% highlight html %}
<link media="only sceen and (min-width:1300px)" type="text/css" href="style.css">
{% endhighlight %}

### 关于断点

这里说的断点不是传统意义的调试断点，而是一些常用的`标准宽度`:

* 320px(iPhone和其他一些设备)
* 769px(iPad)
* 1024

依赖这些断点会有一个问题，今天流行的明天未必流行，而且在断点过渡的时候会显得很突兀，所以，确定断点的一个原则是**追随内容**。让设计稿，内容来确定你的断点。

<figure>
	<a href="/images/article/2014-11/luandun.jpg">
		<img src="/images/article/2014-11/luandun.jpg" alt="home" />
	</a>
	<figcaption>前端乱炖的断点</figcaption>
</figure>

### 兼容性

一般的，在IE9一下，加载下列CSS

{% highlight html %}
<!--[if lt IE 9]>
<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<![endif]-->
{% endhighlight %}

## 图片和视频

### 图片

对于背景图片来说，CSS3有个属性为`background-size`，设置为100%就可以自适应，但是在小屏幕的移动设备加载大图片有点`杀鸡焉用宰牛刀`，一般为了加快速度，我们的策略是：`有选择性的加载图片`，一般会有以下四种方法：

1.万能的媒体查询

只加载与当前屏幕相匹配的图片

2.JS做判断

JS提供了一个方法：`window.matchMedia`，可以把CSS媒体查询作为参数传入，返回相关媒体查询是否匹配的信息。

使用方法：

{% highlight JavaScript %}
if(window.matchMedia('(min-width:320px)').matches) {
	//其他代码
}
{% endhighlight %}

我们可以利用他来加载合适的图片。

3.使用src.sencha.io 

`src.sencha.io`可以传入需要的尺寸和图片地址，自动来压缩图片，使用了CDN+缓存策略技术。当然，我们的服务端也可以自己来实现

<figure>
	<a href="/images/article/2014-11/sencha.jpg">
		<img src="/images/article/2014-11/sencha.jpg" alt="home" />
	</a>
	<figcaption>图片已经被压缩到320px</figcaption>
</figure>

[点击戳图片](http://src.sencha.io/320/http://www.hacke2.cn/images/shiyanshi.jpg)

4.SVG

对于图片伸缩的问题，也可以采用可伸缩矢量图(SGG)来解决。

有关SVG的资料请戳大漠的[w3cplusSVG标签](http://www.w3cplus.com/blog/tags/411.html?u=undefined%26t=%26msgfrom=%26area=msgtext%26clickfrom=3%26clickscene=)。

### 视频

视频的方式与上面类似，可以使用`媒体查询`和`js matchMedia`，当然，用设备看视频的一般是WIFI下，所以直接使用`max-width:100%;height:auto;`也是可以的。如果是连接站外资源，如`优酷`难么，一般解决方法是放到一个iframe里面，详情请看[站外引用的优酷视频，怎样让视频高度自适应？](http://bbs.csdn.net/topics/390600207)

{% highlight JavaScript %}
<div style="width:320px;height:180px" >
     <iframe height="100%" width="100%" src="http://player.youku.com/embed/XNjA3NjQ0MzE2" frameborder=0 allowfullscreen></iframe>
</div>
{% endhighlight %}

## 总结

写到这边，算是对响应式的一个初级入门吧，但个人觉得，做起来原理简单，但**如果设计一个响应式的网站？怎样保证他的高质量？怎么不会影响到速度？已有网站怎么改为相应式的？**这些才是真正值得我们研究的东西。

## 扩展阅读

[CSS3媒体查询](http://www.w3.org/html/ig/zh/wiki/CSS3%E5%AA%92%E4%BD%93%E6%9F%A5%E8%AF%A2)

[媒体查询简介——第1部分：什么是媒体查询？](http://www.infoq.com/cn/news/2011/12/introducing-media-queries)

[什么是响应式Web设计？怎样进行？](http://www.chinaz.com/manage/2011/1121/221607_2.shtml)

[通过CSS3 Media Query实现响应式Web设计](http://developer.51cto.com/art/201201/312206.htm)

[移动优先的跨终端 Web](http://www.imooc.com/learn/43)

[手机淘宝的flexible设计与实现](http://www.html-js.com/article/Like-the-winter-flexible-design-and-implementation-of-the-mobile-phone-Taobao-cold)


**文章来自 [{{ site.url }}]({{ site.url }})**