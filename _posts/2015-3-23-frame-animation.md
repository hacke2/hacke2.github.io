---
layout: post
title: 逐帧动画两种实现方式
description: "分别用JS/CSS实现逐帧动画"
tags: [CSS3]
image:
  background: witewall_3.png
comments: true
share: true
---

>由于使用gif，我们不能将其控制（播放、暂停、播放次数），所以逐帧动画一般使用代码实现，下面我们来介绍两种方法。

**原理就是时时刻刻改变他的`position`**。

<!--more-->

## 1.JS逐帧动画

JS就是调用定时器，这边有一个小技巧：直接改变一个经测试会有闪烁的情况，再加一个重叠替换运动

<a class="jsbin-embed" href="http://jsbin.com/milopu/1/embed?html,css,js,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>


每次改变位置，效率不高。简单封装了一段JS插件

{% highlight JavaScript %}
;(function($) {
    'use strict';
    $.extend($.fn, {
        requestAnimFrame: function(opt){
            var defined = {
                top:0,
                left:0,
                position:'absolute'
            },
            option = $.extend(defined, opt),
            i = 0,
            flag = false,
            curAnim = null,
            self = this,
            width = 0,
            isRunning = false,
            maybeAddPx = function (value) {
                return (typeof value == "number") ? value + "px" : value;
            },
            /**
             * 标准化requestAnimFrame
             * @param  {[type]} ){                         return  window.requestAnimationFrame       ||                    window.webkitRequestAnimationFrame ||                    window.mozRequestAnimationFrame    ||                    function( callback ){                    window.setTimeout(callback, 1000 / 60);                    };        })( [description]
             * @return {[type]}     [description]
             */
            requestAnimationFrame = (function(){
                if(option.time) {
                    return  function( callback ){
                            window.setTimeout(option.time);
                        };
                }
                return  window.requestAnimationFrame       ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame    ||
                        function( callback ){
                            window.setTimeout(callback, 1000 / 60);
                        };
            })(),
            //添加两张图，解决一轮动画结束闪屏问题
            anim_1 = $('<div>', {
                css :  {
                     background : 'url(' + option.url + ') no-repeat scroll 0px 0px transparent'
                     
                }

            }),
            anim_2 = anim_1.clone(),
            init = function() {
                self.append(anim_1).append(anim_2).css('position', 'relative');
            },
            width = option.length / option.step,
            go = function() {
                    if (i > step) { i = 0; }
                    flag ? (curAnim = anim_1) : (curAnim = anim_2);

                    flag = !flag;
                    curAnim[0].style.backgroundPosition = "-" + i * width + "px 0px";
                    //使用Zepto方法会闪动，具体看博文：http://www.hacke2.cn/anmi-strange-problem/
                    //curAnim.css('background-position' , '-' + i * 75 + 'px 0px')
                    self.append(curAnim);

                    i++;
                    console.log(isRunning)
                    isRunning && requestAnimationFrame(go)      
            };

            init();

            return {
                run : function() {
                    isRunning = true;

                    requestAnimationFrame(go);

                },
                stop : function() {
                    isRunning = false;
                },
                isRunning : function() {
                    return isRunning;
                }
            };
        }
    })

        
})(Zepto);
{% endhighlight %}

调用的时候这样调用:

{% highlight JavaScript %}
var ra = scope.find('#divParent').requestAnimFrame({
        step : 80,
        url : 'img/1-slow.png',
        length : 6000,
        time : 12
    });
ra.run();
{% endhighlight %}

自己完成两个DOM的COPY，html结果如下：

{% highlight JavaScript %}
<div id="divParent"></div>
{% endhighlight %}

提供了几个接口：run、stop、isRunning

## 2.CSS3逐帧动画

CSS3方式实现当时比用JS效率高很多，许多优化在浏览器底层完成。之前为什么不用有两点考虑：

1.兼容性

2.每一帧都要手动去写

但是在移动端CSS3已经支持很好了，但每一帧都得自己写太痛苦，还好在一篇博客看到有一个step函数供我们调用 [https://idiotwu.me/css3-running-animation/](https://idiotwu.me/css3-running-animation/)。我们将它整合一下：

<a class="jsbin-embed" href="http://jsbin.com/qejavi/4/embed?html,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>

怎么样，是不是很简单，中间的帧数让浏览器给我们计算就可以了。

，关于`step`，这边有篇文章介绍的很详细[CSS3 timing-function: steps() 详解](https://idiotwu.me/understanding-css3-timing-function-steps/)



**文章来自 [{{ site.url }}]({{ site.url }})**