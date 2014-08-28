---
layout: post
title: Web前端开发流程
description: "Sample post with a background image CSS override."
tags: [总结]
image:
  background: triangular.png
comments: true
share: true
---
# 起因

前几天做阿里笔试题，最后一个问题是：在前端开发中，经常会遇到调用后端接口的情况，如果我们不想依赖后台的开发环境，比如：本地搭建熟悉的环境，模拟AJAX，说出你的解决方案
记得我当时是这样答的：

{% highlight %}
若java
1、使用tomcat环境
2、使用selvet
protected void doGet(HttpServletRequest req, HttpServletResponse resp)
		throws ServletException, IOException {
	resp.getOutputStream().write("{status:'ok',value:'11'}".getBytes("UTF-8"));
	resp.setContentType("text/json; charset=UTF-8");
}

若php
1、使用wamp 环境
2、后端PHP构造json数据：
       echo "{status:'ok',value:'11'}";
   或者
       echo json_encode($result);//$result 是数组
若对数据没有动态提取的要求，则直接放大xxx.json里面
json格式为
{'status':'ok','value':'11'}
前台使用AJAX请求
function ajax(url, success, fail){
    // 1. 创建连接
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 2. 连接服务器
    xhr.open('get', url, true)

    // 3. 发送请求
    xhr.send(null);

    // 4. 接受请求
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                success(xhr.responseText);
            } else { // fail
                fail && fail(xhr.status);
            }
        }
    }
}
//请求到数据
var url =  'json.php'...其他地址
ajax(url, function(data) {
    data.status
})
{% endhighlight %}




<strong>end</strong>