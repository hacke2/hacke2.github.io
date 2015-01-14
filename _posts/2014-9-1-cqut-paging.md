---
layout: post
title: JavaScript模仿实验室分页组件
description: "实验室分页组件，一个简单的分页，非AJAX局部刷新"
tags: [小练习, JavaScript]
image:
  background: witewall_3.png
comments: true
share: true
---

# 起因

刚才蔡哥让我重启一下邻水项目服务器，我顺便有回顾了一下去年做的项目。。当时我的任务是园区动态+配置管理，园区动态里有个分页
当时是拿实验室以前项目：泛教育分页组件做的，完全是拿来主义，现在看到，就像用javascript实现一下，没什么技术含量，设计思路也是
至少7年前的，直接一个a标签打开一个连接，将你的当前页数传到后台去。什么时候再做一个AJAX的。

# 分析

邻水分页如下图：
<img src="/images/article/cqut-paging/1.jpg" alt="邻水分页" />
现在数据还不是很多，显示了三条，而且有首页、尾页、上页、下页等辅助按钮，当当前页为第一个时，上页和首页成不可点击状。
当当前页为最后一个时，下页和尾页成不可点击状。
还有以下规则：
* 如果总页数大于10且当前页远离总页数(小于5)，则显示5个，后面的省略直到最后一个；
* 总页数大于10且当前页接近总页数(小于总页数-3)则显示后4个；
* 除开上面两个情况，显示当前页前后2页

<!--more-->

# 代码

将page传到后台去取数据，一页显示多少条也在后台弄吧，用a数组存a标签，比字符串拼接快很多，StringBuffer也是按照这个原理实现的。


{% highlight JavaScript %}
	function iPage(obj,count,curPage){  
		var href = 'article.do?page=';
		var obj=obj;
		var count=count;
		var curPage=curPage;
		var a=[];
		//总页数少于10 全部显示,大于10 显示前3 后3 中间3 其余....
	
		if(curPage == 1) {
			a.push('<a href="#" class="unclick" >首页</a>');
			a.push('<a href="#" class="unclick" >上页</a>');
		}
		else {
			a.push('<a href="' + href + 1 + '" >首页</a>');
			a.push('<a href="' + href + (curPage-1) + '"  >上页</a>');
		}

		//总页数小于10
		if(count<=10){
			for(var i=1;i<=count;i++){
				createPage(i);
			}
		}else {
			if(curPage <= 4) {//总页数大于10且当前页远离总页数(小于5)
				for(var i = 1; i <=5; i++) {
					createPage(i);
				}
				a.push('...<a href="' + href + count + '">'+count+'</a>')
			}else if(curPage>=count-3){//总页数大于10且当前页接近总页数(小于总页数-3)
				a.push('<a href="' + href + 1 + '">1</a>');
				for(var i=count-4;i<=count;i++){
					createPage(i);
				}
			}else{ //除开上面两个情况
				a.push('<a href="' + href + 1 + '">1</a>...');
				for(var i=curPage-2;i<=curPage+2;i++){
					createPage(i);
				}
				a.push('...<a href="' + href + count + '">'+count+'</a>');
			}
		}

		if(curPage==count){
			a.push('<a href="#" class="unclick">下页</a>');
			a.push('<a href="#" class="unclick">尾页</a>');
		}
		else{
			a.push('<a href="' + href + (curPage + 1) + '">下页</a>');
			a.push('<a href="' + href + count + '">尾页</a>');
		}
		
		obj.innerHTML=a.join("");

		//生成页面
		function createPage(i){
			if(curPage==i){
				a.push('<a href="' + href + i + '" class="on">'+i+'</a>');
			}
			else{
				a.push('<a href="' + href + i + '" >'+i+'</a>');
			}
		}
	}
{% endhighlight %}


## <a style="color:red" href="/demo/cqut-paging/demo.html" >查看完整DEMO</a>


<img src="/images/article/cqut-paging/2.jpg" alt="我的分页" />

<strong>end</strong>