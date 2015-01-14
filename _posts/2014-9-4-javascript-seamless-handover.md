---
layout: post
title: JavaScript打造无缝切换
description: "用JavaScrip写的无缝切换，弥补一年前的遗憾"
tags: [JavaScript, 小练习]
image:
  background: witewall_3.png
comments: true
share: true
---

# 起因

一年前写管理学院的时候，那时候做首页有一个幻灯片，由于之前没交流好，CL写的静态页面幻灯片图片是在背景里，让我用jq写，
当时就感觉特别啃爹，图片写在了css里。。好坑爹，自己又懒得改，只能硬着头皮用jq写，一堆临时变量，如num++，各种奇葩，最后加了
个jq淡隐淡出的效果，就交差了，，代码如下：

<script src="https://gist.github.com/hacke2/5434a4346a1169f8b97b.js"></script>

<!--more-->

这几天一个前端qq群主分享了一个东西说平时可以练练手，我没有做，可是看到他说，<strong>群里面有些人小东西不屑做，稍微大点有不会做</strong>
我当时就感觉说我。。刚才写了一下，与大家分享

# 思路

关键一点就是克隆,而且是深克隆，obj.clone(true);这样就能克服该节点的所有子节点。之所以选择克隆，是因为直接删除太突兀了。

一般无缝切换的幻灯片是这样做的

1.点击前一个：将最开始的节点克隆到最后一个节点后面，然后整体向前移，并且删除掉第一个元素

2.点击后一个：将最后节点克隆到最前面的节点钱，然后整体向后移，并且删除掉最后一个元素

动画效果用的智能社的动画脚本

# 代码

代码在github上，有兴趣的看下：

<a target="_blank"  href="https://github.com/hacke2/frontcode">JavaScript打造无缝切换</a><br/>

## <a target="_blank"  style="color:red" href="/demo/javascript-seamless-handover/slide/bd01.html" >查看完整DEMO</a>

<strong>end</strong>