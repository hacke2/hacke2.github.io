---
layout: post
title: 了不起的Node.js读书笔记
description: "一般结构和思路特别清晰的Node.js入门书籍"
tags: [读书笔记, Node.js]
image:
  background: witewall_3.png
comments: true
share: true
---

<figure>
	<a href="http://img11.360buyimg.com/n0/g15/M07/17/03/rBEhWVKMZ1AIAAAAAAVG8mJwrncAAFuKwEuVBwABUcK039.jpg">
		<img src="http://img11.360buyimg.com/n0/g15/M07/17/03/rBEhWVKMZ1AIAAAAAAVG8mJwrncAAFuKwEuVBwABUcK039.jpg" alt="home" />
	</a>
	<figcaption>了不起的Node.js</figcaption>
</figure>

<!--more-->

# 第二章 Js概览

## 基于GoogleV8引擎

 * Object.keys(o)
 * 数组方法：遍历forEach、过滤filter、改变map
 * 实现了String.prototype.trim()
 * 含有JSON解析

# 第三章 阻塞与非阻塞IO

## 单线程注意点

 * 小心处理内存中的变量，可能会影响两次访问的结果
 * 不要编写阻塞式代码，可能会影响第二次访问的时间

## 事件轮训

 *  先注册事件
 * 不断询问这些事件是否已经分发dispatch
 * 当事件分发了，相应的回调就会被触发
 * 如果事件未触发，则继续执行其他代码
 * 捕获未来才会执行到的函数所抛出的异常是不可能的
 * 避免同步IO

# 第四章 Nodez中的Javascript

## global对象

* 对应于浏览器window

## process对象

* process.nextTick == serTimeout(fn,1)

## 模块

 * require module exports
 * NPM
 * 绝对模块指Node内置模块以及在node_modules模块require(‘fs’)
 * 相对模块指通过相对路径找的模块require(‘./module’)
 * 暴漏数据exports.a(多个)、重写module.exports(一个)

##事件

 * EventEmitter
 * 事件监听 on，事件分发emit，事件移除removeListener
 * 只执行一次once
 * data事件 数据是部分到达，而不是一次性全到达返回给你

## buffer 

 * 处理二进制数据

# 第五章CLI &FS API

## Stream

 * stdin 可读流 stdout/stderr可写流
 * stdin.resume 等待用户输入
 * console == process.stdout.write(str + ‘\n’)

## fs

 * readdirSync(__dirname) readFileSync同步 
 * readdir(‘.’, async) readFile 异步 
 * createReadSteam 读取可变大小 有data、end事件多用于图片、大型文件等
 * watchFile监视文件是否改变

## process

 * process.argv 运行的参数
 * process.cwd 获取当前工作目录
 * process.env 环境变量
 * process.exit退出
 * 信号量

# 第六章TCP

## TCP

 * 面向连接，基于IP协议
 * IP协议发包无序，TCP给发送的IP包含了标示符和数据流顺序信息
 * 面向字节 对字符以及字符编码完全无知，很好的灵活性
 * 可靠性 三次握手、窗口时间重发
 * 流控制，对接收和发送的速度控制
 * 拥堵控制 避免拥堵、数包报的延迟率和丢包率不会太高

## Telnet

 * 当不是telnet协议是自动降级为TCP
 * 发送GET /HTTP/1.1模拟浏览器请求，两次回车

## net  

 * Node.js核心TCP模块
 * data close end事件
 * conn.setEncoding(‘utf-8’) 或 Buffer.toString(‘utf-8’)
 * 服务端createServer 客户端connect方法 connect事件

# 第七章HTTP

## HTTP

 * TCP上层协议
 * Content-Type类型 文本、HTML、XML、JSON、PNG
 * Transfer-Encoding: chunked 输出的内容长度不能确定，Node天生的异步机制，	这样相应可以逐形成
 * 301 永久转移 302 临时转移 304资源未改变 403未授权 404资源未找到 
 * 表单Content-Type application/x-www-form-unencoded

## http 模块

 * request、response 参数
 * 判断路由为method+url
 * querystring模块 将字符串解析成对象
 * request方法模拟一个请求，传回来的数据2进制，设置utf-8
 * superagent 模拟客户端（模拟一个请求）模块
 * up 重启服务器模块

# 第八章Connect

## 工具集&中间件

 * 模块:connect
 * 中间件调用server.user(...)
 * 日志中间件console.log(‘%s %s ’, req.method, req.url)
 * 模拟请求时间过长中间件，在res.end是清除定时器
 * static中间件 处理静态文件connect.static(‘..’)
 * query中间件 获取查询字符串connect.query
 * logger 中间件connect.logger(‘dev’)
 * body parser中间件connect.bodyParser()如果在POST使用了JSON格式，body 	parser自动转JSON对象，还可以处理用户上传文件req.body.file多文件表单name	使用name=”file[]”
 * seesion中间件 会话connect.session 使用方法req.session.user
 * redis session 会话持久化中间件
 * methodOverride 中间件 让低版本浏览器支持PUT、DELETE、PATCH
 * basicAuth中间件 用户身份验证

# 第九章EXPRESS

## express

 * WEB应用开发框架，基于Connect
 * app.set(‘view engine’, ‘ejs’) 设置EJS模板引擎
 * app.set(‘view’, __dirname + ‘/view’) 设置视图层路径
 * app.set(‘view cache’, ‘true) 设置模板缓存
 * 使用app.get()、app.put()、app.post()配置路由，可传参数如:id，获取req.params.id
 * res.render(‘search’，obj) 渲染模板
 * 其他设置大小写敏感、严格路由、jsonp回调
 * 为res和req提供了快捷方法 render渲染、redirect重定向req.header检查头信息
 * 中间件 app.user(function(req, res, next){})
 * 代码组织 分层、分包、MVC，建议仿照Spring MVC

## 模板引擎

Express/Haml/Jade/CoffeeKup/JQuery Templates for node

#第十章WebSocket

## Ajax

 * 异步javascripy
 * 缺陷；每次都建立HTTP请求，消耗网络资源，不适于实时服务
HTML5 WebSocket
 * 基于ws协议
 * node支持:websocket.io
 * 客户端new WebSocket

## 缺陷

 * 关闭不意味着断开，使用心跳检测机制判断
 * 对JSON支持不够友好
 * 客户端临时断开无法解决 使用定时器或者刷新页面？
 * 兼容性

# 第十一章Socket.io

## 优势

 * 跨浏览器，支持WebSocket则原生，不支持使用长连接方式,连接会持续打开	20-50s
 * 即使浏览器支持的WebSocket被代理或者防火墙禁止了，Socket.io仍然会通过其	他技术来解决
 * 如果客户端停止传输信息，并且一定时间没有正常的关闭，则认为连接已经断开
 * 当连接丢失时，自动重连
 * 对逻辑进行分层，有命名空间
 * 支持emit分发和listen监听事件

# 第十二章MongoDB

## MongoDB

 * 面向文档，绝大多数情况是JSON
 * 连接 new mongodb.Server(‘127.0.0.1’, 27017)
 * API open insert find ensureIndex findOne 
 * $set 设置 $push 推入数组

## Mongoose

 * 类似于JAVA中ORM框架，简化数据库开发
 * 连接mongoose.connect(‘mongodb://localhost/database’)
 * Schema：一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力
 * Model: 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对
 * Entity:由Model创建的实体，他的操作也会影响数据库
 * index 索引 title : {type : String, index : true} unique : true 唯一
 * new Schema({}).pre(‘save’, function(){})保存之前做一些处理
 * 常用API find,findOne,remove,update,count
 * new Schema({}).find({_id:‘xx’}).where(‘title’,‘xxx’).sort(‘content’, -1).limit(5).run(function(err, data){}) 类似JQ查询
 * .select(‘_id’, ‘name’)选择查询指定字段
 * .skip 跳过 mongoose.Schema.ObjectId 生成随机ID
 * clazz : [Clazz] 嵌套的Sehema
 * clazz: {type : ObjectId , ref: ‘Clazz’} 关联查询
 * 添加静态PersonSchema.statics.findByName通过model调用
 * 添加实例方法 PersonSchema.methods.findSimilarTypes Entity调用

# 第十三章MySQL

## MySQL 

 * 主要使用query执行SQL
 * 有占位符 ? 插入数据（和JAVA一样）
 * 使用seqelize Node版ORM框架

# 第十四章Redis

## Redis

 * 应用场景：简单数据模型、数据集。适合存储在内存
 * seesion持久化

# 第十五章 代码共享

## 书写兼容性代码

 * 导出模块 ，前端后端都可使用

(function(module){
module.exports = function(a, b ){ 
return a+b;
}
If(‘undefined’ != typeof window) {
Window.add = module.exports;
}
})(‘undefined’ == typeof module ? {module : {exports : {}}}: module) 

 * 模拟实现ECMA:扩展原型或者实现工具函数
 * EventEmitter。Assert、XMLHttpRequest、DOM、WebSocket、node-canvas都在	git上有实现
 * bowserbuild 将node模块转为浏览器可识别的代码

# 第十六章测试

## assert

 * 常用API ok,be/equal/eql/a/macth...

## Mocha

 * 简化书写
 * 测试异步代码
 * 生成报告

<strong>end from <a href="{{ site.url }}"> {{ site.url }}</a></strong>