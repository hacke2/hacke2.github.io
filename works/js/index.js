
//将路由注入进来
var showApp= angular.module('show', ['ngRoute']);
 
//配置路由
showApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
            templateUrl : 'template/show.html'
        })
        .when('/roadsideAssistance', {
            templateUrl : 'pages/project.html',
            controller  : 'roadsideAssistanceController'
        })
        .when('/westom', {
            templateUrl : 'pages/project.html',
            controller  : 'westomController'
        });
});
showApp.controller('mainController', function($scope) {
    $scope.message = {
    	name : '王兴龙',
    	mail :　'hacke2@qq.com',
    	other : '以下填写个人介绍'
    };
});
 
showApp.controller('roadsideAssistanceController', function($scope) {
    $scope.project = {
    	name : '道路救援',
    	other : '以下为其他信息'
    };
});
 
showApp.controller('westomController', function($scope) {
    $scope.project = {
    	name : '威士顿智能家居',
    	other : '以下为其他信息'
    };
});