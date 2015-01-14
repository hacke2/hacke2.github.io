---
layout: post
title: Mongoose简单的连表查询
description: "使用populate属性"
tags: [Mongoose]
image:
  background: witewall_3.png
comments: true
share: true
---


像我这篇文章所说的<a href="http://www.hacke2.cn/gokk/">基于Node.js + jade + Mongoose 模仿gokk.tv</a>，当时停止开发是因为我深深的感觉到当时想错了，应该用两个Schema，而不是一个下面又有数组来存，这样取数据是方便，当时分页相当麻烦，不能使用原生提供的limit方法。

今天看到一本书上有讲，尝试了一把，记录下来

我们实验的场景为一个班级有N多学生，先通过学生ID找到班级名称（是不是被玩腻了？）

先来将Schema定义好

<!--more-->

ClazzSchema ： 

{% highlight JavaScript %}
var mongoose = require('mongoose')

var ClazzSchema = new mongoose.Schema({
	clazzName:String
})
//其他方法省略..
}

module.exports = ClazzSchema

{% endhighlight %}
    
StudentSchema ： 

{% highlight JavaScript %}
var mongoose = require('mongoose')

var StudentSchema = new mongoose.Schema({
	name:String,
	clazzID : {
		type : mongoose.Schema.ObjectId,
		ref : 'Clazz'
	}
})

StudentSchema.statics = {
	findClazzNameByStudentId:function(studentId, callback){
			return this
				.findOne({_id : studentId}).populate('clazzID')
				.exec(callback)
		}
	//其他方法省略..
}

module.exports = StudentSchema

{% endhighlight %}

可以看到，主需要将ClazzID设为ref到Clazz,依赖为你建立Model时的名称就可以了,要查询Clzz使用populate

下面是Model

{% highlight JavaScript %}
var mongoose = require('mongoose')
var ClazzSchema = require('../schemas/clazzSchema')
var Clazz = mongoose.model('Clazz',ClazzSchema)


module.exports  = Clazz 
{% endhighlight %}

{% highlight JavaScript %}
var mongoose = require('mongoose')
var StudentSchema = require('../schemas/studentSchema')
var Student = mongoose.model('Student',StudentSchema)


module.exports  = Student 
{% endhighlight %}

大同小异，着重看test.js

{% highlight JavaScript %}
var mongoose = require('mongoose')
var Clazz = require('./models/clazzModel')
var Student = require('./models/studentModel')
//var db = mongoose.createConnection('localhost', 'gokk')
mongoose.connect('mongodb://localhost/test')

/*var clazz = new Clazz(
	{
		clazzName:'软件2班'
	}
);

clazz.save(function  (argument){
	console.log('true');
});*/

/*var student = new Student({
	name : 'hacke2',
	clazzID : '542b5fcc49df6e741d8d15f5'
})
student.save(function (err){
	console.log('true');
})*/

Student.findClazzNameByStudentId('542b600a683d59a80d4ee632', function (err, student){
	if(err) console.log(err);
	console.log(student.clazzID.clazzName);
})
{% endhighlight %}

之前添加了两班级：软件一班和软件二班

我们在新增hacke2时将classID设为软件2班的，查新hacke2时自动就会把关键的
Class查询到

{% highlight JavaScript %}
{ _id: 542b600a683d59a80d4ee632,
    name: 'hacke2',
    clazzID: { _id: 542b5fcc49df6e741d8d15f5, clazzName: '软件2班', __v: 0 },
    __v: 0 }
{% endhighlight %}
<strong>end from <a href="{{ site.url }}"> {{ site.url }}</a></strong>