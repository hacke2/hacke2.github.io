---
layout: post
title: GhostJs源码目录
description: "GhostJs源码的学习"
tags: [JavaScript]
image:
  background: witewall_3.png
comments: true
share: true
---

之前[Demon](http://Demon.com)写了一个JS类库[Ghosejs](https://github.com/DemonCloud/GhostJS)，最近我打算学一下。

先贴一下整理的整体结构，前面的为行数。

{% highlight JavaScript %}
/**
名称 Ghostjs
版本 0.0.3

21 入口
38 G()函数入口，DOM加载后执行，兼容FF和IE，类似于$(function(){});如果是结点会走_G()
	116 引用了一些常见的方法
	146 常见的正则
	186 全局缓存
	204 UA判断
220 _G() 选择器包装入口，有length等，具体选择器在selector数组里
	276 queueSelector复杂选择器 G('div>p +warp')，最终找到P
	353 选择器入口 支持ID CLASS TAG * >选择
	378 _G原型方法
		381 each 对遍历元素的迭代，参数返回为dom, index, this(当前遍历对象) 
		441 signet 给_G元素加属性
		455 at 类似于JQ的eq
		477 back G(elm).at(n).xxx(做一堆事情).back().yyy(在原来的选择器上做事情)
		510 first last
		525 fix 调用AryFilter
		541 even odd
		563 next prev siblings
		667 warp 所选元素的子元素 warpClass warpTag ctains 
		724 obstruct 阻塞执行
		741 trash 清楚缓存
		765 事件 bind unbind once
		811 CSS方法 hide show adClass rmClass tgClass stStyle gtStyle
		909 属性方法stAttr rmAttr gtAttr
		948 动画 animate fdIn fdOut
		1027 DOM操作 insetHTML gtInHTML insetText gtInText rmNode apend
		1108 位置与大小 w h gtPos scTo bscTop bscBtom
1167 G的共用方法 实现了一些本类库的内部方法，兼容了部分ECMAScript 5、ECMAScript 6方法
1732 编码的一些转换	
1801 模板引擎
1875 一些判断 返回bool类型那种	
1921 ajax
1968 jsonp
2036 cookie
2141 事件
2256 其他内部方法
2411 Tween动画算法
**/
{% endhighlight %}

<!--more-->

大致的结构如此，今天和作者聊了一下午，他打算吧动画那一块还要做一些事情，加入点高级动画的特效

里面有很多技巧，比如项目入口就是兼容非CMD模块加载的解决方案，作者说还没加上去


还有各种部分ECMAScript 5、ECMAScript 6兼容方法

{% highlight JavaScript %}
G.AryFilter = function(ary, func) {
    if (nativeFilter) {
        //ECMAScript 5 filter
        // func(e) 返回为 true. 则会被保留. 如果 func(e) 返回为false. 那就会被过滤从数组中移除掉
        G.AryFilter = function(ary, func) {
            return ary.filter(func)
        };
    } else {
        G.AryFilter = function(ary, func) {
            //ary [1,2,3,4,5]
            //func function(e){ return e!==4 } -> [1,2,3,5]
            for(var i = ary.length;i--;){
                if (!func(ary[i],i))  splice.call(ary,i,1);
            }
            return ary;
        };
    }
    return G.AryFilter(ary, func)
};
{% endhighlight %}

还有一些函数的处理技巧，如下时间绑定，在第一次判断兼容性，将函数覆盖，之后就不用判断了

{% highlight JavaScript %}
 function OneBind(e, event, callback) {
    if (doc.addEventListener) {
        OneBind = function(el, eve, call) {
            el.addEventListener(eve, function() {
                el.removeEventListener(eve, arguments.callee);
                call.call(el);
            });
        };
    } else {
        OneBind = function(el, eve, call) {
            el.attachEvent("on" + eve, function() {
                call.call(el);
                el.detachEvent("on" + eve, arguments.callee);
            });
        };
    }
    return OneBind(e, event, callback);
}
{% endhighlight %}


DEMON一个乐于分享自己的一些经验的同学，知识只从外国网站获取，是一位很有潜力的牛人，以后混的好可别忘了我啊：D

**end from [{{ site.url }}]({{ site.url }})**