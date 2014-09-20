
//将路由注入进来
var showApp= angular.module('show', ['ngRoute']);
 
//配置路由
showApp.config(function($routeProvider) {
    $routeProvider
	.when('/', {
            templateUrl : 'main.html'
        })
		.when('/hot-site/', {redirectTo: '/hot-site/1'})
        .when('/hot-site/:index', {
            templateUrl : 'template/show.html',
            controller  : 'showController'
        })
        .when('/westom', {
            templateUrl : 'pages/project.html',
            controller  : 'westomController'
        });
});
showApp.controller('showController', function($scope, $routeParams) {
	
	var index = $routeParams.index;
	
	$scope.routeName = 'hot-site';
	
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
    		name : '中秋送好礼,
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
 
