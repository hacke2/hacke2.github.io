
//将路由注入进来
var projectShowApp= angular.module('project-show', ['ngRoute']);
 
//配置路由
projectShowApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'mainController'
        })
        .when('/01', {
            templateUrl : 'pages/01/',
        })
        .when('/02', {
            templateUrl : 'pages/02/',
        });
});
projectShowApp.controller('mainController', function($scope) {
    $scope.message = {
    	name : '这里是我的一些前端小练习',
    	mail :　'hacke2@qq.com',
    	other : 'github : github.com/hacke2/frontcode'
    };
});
 
