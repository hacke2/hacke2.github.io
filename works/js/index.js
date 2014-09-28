
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
        .when('/html5', {redirectTo: '/html5/0'})
        .when('/html5/:index', {
            templateUrl : 'template/show.html',
            controller  : 'html5Controller'
        })
        .when('/project/', {
            templateUrl : 'template/about.html',
            controller  : 'projectController'
        })
        .when('/javascript/', {redirectTo: '/javascript/0'})
        .when('/javascript/:index', {
            templateUrl : 'template/show.html',
            controller  : 'javascriptController'
        })
});
showApp.controller('hotSiteController', function($scope, $routeParams) {
	
	var index = $routeParams.index;
	
	$scope.routeName = 'hot-site';
	
    $scope.works = data.hotSite;
    
    document.getElementById('mainIframe').setAttribute('src', $scope.works[index].url);
});
 
showApp.controller('javascriptController', function($scope, $routeParams) {
	
	var index = $routeParams.index;
	
	$scope.routeName = 'javascript';
	
    $scope.works = data.javascript;
    
    document.getElementById('mainIframe').setAttribute('src', $scope.works[index].url);
});

showApp.controller('html5Controller', function($scope, $routeParams) {
	
	var index = $routeParams.index;
	
	$scope.routeName = 'html5';
	
    $scope.works = data.html5;
    
    document.getElementById('mainIframe').setAttribute('src', $scope.works[index].url);
});

showApp.controller('projectController', function($scope, $routeParams) {
	$scope.works = data.project;
});