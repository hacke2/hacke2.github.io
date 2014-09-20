
//将路由注入进来
var showApp= angular.module('show', ['ngRoute']);
 
//配置路由
showApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
            templateUrl : 'mian.html'
        })
        .when('/hot-site', {
            templateUrl : 'template/show.html',
            controller  : 'showController'
        })
        .when('/westom', {
            templateUrl : 'pages/project.html',
            controller  : 'westomController'
        });
});
showApp.controller('showController', function($scope) {
    $scope.works = [
    	{
    		name : 'CSS3弹窗&切换',
    		desc : '模仿联想招聘',
    		url : '/works/demo/04/'
    	},
    	{
    		name : '无缝切换图片',
    		desc : '模仿百度爱玩',
    		url : '/demo/javascript-seamless-handover/slide/bd01.html'
    	},
    	{
    		name : '榜单tab切换',
    		desc : '模仿百度爱玩',
    		url : '/works/demo/03/bd03.html'
    	}
    ];
});
 
