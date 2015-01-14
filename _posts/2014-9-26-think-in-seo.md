---
layout: post
title: 和我一起来了解SEO
description: "前端工程师必备的SEO知识"
tags: [SEO]
image:
  background: witewall_3.png
comments: true
share: true
---

# 基础知识

## 搜索引擎

搜索引擎爬虫会检索各个网站，分析他们的关键字，从一个连接到另一个连接，如果爬虫觉得这个关键字是有用的
就会存入<strong>搜索引擎数据库</strong>，反之如果没用的、恶意的、或者已经在数据库的，就会舍弃。搜索引擎数据库
保证是爬虫爬过的最新的数据。用户在使用搜索引擎会在搜索引擎数据库查找关键词，展现给用的的是排序后的结果。除开
某些搜索引擎推广的，剩余的一般是按照关联度来排序。

## SEO简介

SEO（Search Engine Optimization）汉译为搜索引擎优化.seo优化是专门利用搜索引擎的搜索规则来提高目
前网站在有关搜索引擎内的自然排名的方式.SEO的目的理解是为网站提供生态式的自我营销解决方案，让网站在
行业内占据领先地位，从而获得品牌收益.

如在百度搜索hacke2，第一个就是我的前端博客<a href="www.hacke2.cn">www.hacke2.cn</a>

<figure>
	<a href="/images/article/7.jpg">
		<img src="/images/article/7.jpg" alt="home" />
	</a>
	<figcaption>百度搜索hacke2</figcaption>
</figure>

<!--more-->

### 白帽SEO

采用SEO的思维，合理优化网站，提高用户体验，合理与其他网站互联。从而使站点在搜索引擎排名提升。
白帽SEO关注的是长远利益，需要的时间长，但效果稳定。

### 黑帽SEO

就是采用搜索引擎禁止的方式优化网站，影响搜索引擎对网站排名的合理和公正性。同时随时因为搜索引擎
算法的改变而面临惩罚。比如加的关键字与自己网站根本无任何关系，这些关键字一般都是最近最火的关键字
欺骗用户、欺骗爬虫。

### 白帽SEO的相关手段

* 网站标题、关键字、描述
* 网站内容优化
* robot.txt
* 网站地图
* 增加外链引用

一般有关前端工程师的有：网站布局结构优化、网页代码优化。

# 前端SEO

## 网站布局结构优化

网站结构尽量简单、清晰。推荐扁平化结构。相关手段如下：

### 控制首页连接数量

对于中小型网站来说，最好不要太多，但也不能太少

### 扁平化目录层次

爬虫希望看到你网站的结果是树形结构。
如动物-->猫科动物-->狮子

### 导航

导航尽量是文字，而且层级尽量小于三级。如本站导航若为图片，title和alt必须添加

<figure>
	<a href="/images/article/6.jpg">
		<img src="/images/article/6.jpg" alt="home" />
	</a>
	<figcaption>本站导航</figcaption>
</figure>

### 其他

使用面包屑导航、单个页面不超过100k

## 代码

### head

<strong>title</strong> 表示网页的标题
<strong>description</strong> 表示网页的描述
<strong>keywords</strong> 表示网页的关键字

下面是本站的相关描述，右键查看源代码即可看到

{% highlight HTML %}
<title>hacke2's blog | WEB前端,一路前行 &#8211; hacke2's blog</title>
<meta name="description" content="hacke2的前端技术博客,分享自己的技术心得,积累前段技能,汇聚前端之路的点点滴滴。">
<meta name="keywords" content="hacke2, blog, hacke2 blog, 前端技术, javascript">
{% endhighlight %}

### 语义化

<a href="http://www.html5jscss.com/html5-semantics-section.html">HTML 5的革新——语义化标签</a>
<a href="http://www.cnblogs.com/yizuierguo/archive/2009/07/26/1531112.html">深更半夜话(html)语义</a>

### 代码优化

<a href="http://www.doc88.com/p-213653269816.html">SEO网页代码优化</a>
<a href="http://www.pc6.com/infoview/Article_32813.html">优化HTML代码加快网页速度</a>


>部分参考百度百科、慕课网

<strong>end from {{ site.url }}</strong>