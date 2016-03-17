---
layout: post
title: 在移动端上使用原生滑屏解决方案
description: "解决UC左右滑动BUG"
tags: [Mobile Web]
image:
  background: witewall_3.png
comments: true
share: true
---

>最近有个需求，就是非常简单地横向滑动。打算使用overflow-x:auto;来试验原生滑动，但在安卓版UC下当滑到最左或者最右会`默认启用UC上一页、下一页手势`，导致页面的跳转（原生浏览器无此手势）。之前好几个项目之前视频有使用js处理(query: 夏洛特烦恼), 横向滑动没有加惯性支持，非常卡顿。感觉此类对距离没有要求的滑动用原生最好，而且overflow-x:auto;兼容性支持到安卓2.1以上，使用起来也非常方便，所以打算在UC下做一下适配。

<!--more-->

## 使用css布局

先使用overflow-x:auto;给UL加上一下css，做出横向滑动的效果：

```css
overflow-x: auto;
white-space: nowrap;
-webkit-overflow-scrolling: touch;
```

这样，一个简单地滚动效果就实现了。如图

![css滑动](http://ww4.sinaimg.cn/large/8ae515a4gw1ex7vnx0qpnj20ke066gn4.jpg)

在UC浏览器安卓版下试验，不出所料的滑到最右边启用了UC上一页、下一页手势。

## 解决思路

经过无数次和@绍伟的试验，给`body`绑定`touchmove`事件，并且组织默认行为就能把UC效果干掉，那么就有思路了：

1. 在滑到最左边或者最右边给Body绑定事件，组织默认行为
2. 当手指抬起解绑事件

## 参考代码

具体参考代码如下：


```js
var preventUCDefault = (function() {
    var ua = window.navigator.userAgent,
        startX = 0,
        diffY = 0,
        bindPreventTouch = function() {
            $(document.body).on('touchmove.prevUC', function(e) {
                e.preventDefault();
            });
        },
        isAndroid = (function() {
            //https://github.com/amfe/lib-env/blob/master/src/browser.js#L70
            return (!!ua.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/) && !!ua.match(/Android[\s\/]([\d\.]+)/));
        })();

    return {
        init : function(ul) {
            if(isAndroid) {
                var scrollWidth = ul[0].scrollWidth;

                ul.on('touchstart.prevUC', function(e) {
                    startX = e.touches[0].pageX;
                });

                ul.on('touchmove.prevUC',function(e) {
                    diffY = e.touches[0].pageX - startX;
                    if($(this).scrollLeft() == 0 && diffY > 0) {
                        //到最左
                        bindPreventTouch();
                    }else if((scrollWidth - $(this).scrollLeft() - ul.width())  === 0 && diffY < 0) {
                        //到最右
                        bindPreventTouch();
                    }
                });

                ul.on('touchend.prevUC',function(e) {
                    $(document.body).off('touchmove.prevUC');
                });
            }
        }
    }
})();


preventUCDefault.init(scope.find('.slide-image ul'));

```


经过QA测试，低版本UC下滑动效果也很不错呢！

## 优化


当然，想开启gpu加速可以加上下句话：

```css
-webkit-transform:translateZ(0);
```

另外，使用原生滑动会出现滚动条，如果想达到极致体验的话，@靳磊给了两个思路：

1. 外面套一层，给定高度+overflow:hidden;
2. 加一个伪元素将滚动条遮起来

使用伪元素代码如下

```css
 ul::after {
    display: block;
    content: "";
    position: absolute;
    z-index: 10;
    width: 100%;
    background-color: #fff;
    height: 10px;
    margin-top : -11px;
}
```

## 总结

对于一个问题一个人思考思维会很局限，和大家一起讨论完成学到了很多解决的办法，能将任务完成最优而且增进团队的融合性。

---

更新 2015年12月14日

隐藏滚动条还有更好地方法

```css
ul::-webkit-scrollbar {
        display: none;
    }
```

主要解决背景非纯色而是虚化这样的需求，uc下有效，但是safari下还是会出现滚动条，有点小遗憾。

**文章来自 [{{ site.url }}]({{ site.url }})**