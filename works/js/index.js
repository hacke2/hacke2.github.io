
//将路由注入进来
var showApp= angular.module('show', ['ngRoute']);
 
//配置路由
showApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
            templateUrl : 'main.html'
        })
		.when('/hot-site/', {redirectTo: '/hot-site/0'})
        .when('/hot-site/:index', {
            templateUrl : 'template/show.html',
            controller  : 'hotSiteController'
        })
        .when('/mobile', {redirectTo: '/mobile/0'})
        .when('/mobile/:index', {
            templateUrl : 'template/show-m.html',
            controller  : 'mobileController'
        })
        .when('/project/', {
            templateUrl : 'template/about.html',
            controller  : 'projectController'
        })
        .when('/base/', {redirectTo: '/base/0'})
        .when('/base/:index', {
            templateUrl : 'template/show.html',
            controller  : 'baseController'
        })
});
showApp.controller('hotSiteController', function($scope, $routeParams) {
	
	var index = $routeParams.index;
	
	$scope.routeName = 'hot-site';
	
    $scope.works = data.hotSite;
    
    document.getElementById('mainIframe').setAttribute('src', $scope.works[index].url);
});
 
showApp.controller('baseController', function($scope, $routeParams) {
	
	var index = $routeParams.index;
	
	$scope.routeName = 'base';
	
    $scope.works = data.base;
    
    document.getElementById('mainIframe').setAttribute('src', $scope.works[index].url);
});

showApp.controller('mobileController', function($scope, $routeParams) {
	
	var index = $routeParams.index;
	
	$scope.routeName = 'mobile';
	
    $scope.works = data.mobile;
    
    document.getElementById('mainIframe').setAttribute('src', $scope.works[index].url);
});

showApp.controller('projectController', function($scope, $routeParams) {
	$scope.works = data.project;
});