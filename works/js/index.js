
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
        .when('/html5', {redirectTo: '/'})
        .when('/html5/:index', {
            templateUrl : 'template/show.html',
            controller  : 'html5Controller'
        })
        .when('/css3/', {redirectTo: '/'})
        .when('/css3/:index', {
            templateUrl : 'template/show.html',
            controller  : 'css3Controller'
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
	
    $scope.works = [
    	{
    		name : '榜单tab切换',
    		desc : '模仿百度爱玩',
    		url : '/works/demo/03/bd03.html'
    	},
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
    		name : '电商菜单导航',
    		desc : '百度微购',
    		url : '/works/demo/08/'
    	},
    	{
    		name : '查看长图',
    		desc : '模仿QQ空间',
    		url : '/works/demo/qqzone-img'
    	},
    	{
    		name : '中秋送好礼',
    		desc : '百度微购图片轮播',
    		url : '/works/demo/07/'
    	},
    	{
    		name : '层次图片轮播',
    		desc : '模仿百度爱玩',
    		url : '/works/demo/06/'
    	}
    ];
    
    document.getElementById('mainIframe').setAttribute('src', $scope.works[index].url);
});
 
showApp.controller('javascriptController', function($scope, $routeParams) {
	
	var index = $routeParams.index;
	
	$scope.routeName = 'javascript';
	
    $scope.works = [
    	{
    		name : '瀑布流-浮动',
    		desc : '瀑布流-浮动',
    		url : '/works/demo/stream/float.html'
    	},
    	{
    		name : '瀑布流-定位',
    		desc : '瀑布流-定位',
    		url : '/works/demo/stream/position.html'
    	}
    	
    ];
    
    document.getElementById('mainIframe').setAttribute('src', $scope.works[index].url);
});