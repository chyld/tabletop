(function(){
  'use strict';

  angular.module('tabletop', ['ui.router', 'LocalForageModule'])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$localForageProvider', function($stateProvider, $urlRouterProvider, $httpProvider, $localForageProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home',       {url:'/',                 templateUrl:'/views/home/home.html',       controller:'HomeCtrl'})
    .state('register',   {url:'/register',         templateUrl:'/views/users/users.html',     controller:'UsersCtrl'})
    .state('login',      {url:'/login',            templateUrl:'/views/users/users.html',     controller:'UsersCtrl'})
    .state('logout',     {url:'/logout',           template:'',                               controller:'UsersCtrl'})
    .state('rooms',      {url:'/rooms',            templateUrl:'/views/rooms/rooms.html',     controller:'RoomsCtrl'})
    .state('games',      {url:'/games/{gameId}',   templateUrl:'/views/games/games.html',     controller:'GamesCtrl'})
    .state('charCreate', {url:'/character-create', templateUrl:'views/character/create.html', controller:'CharCtrl'})
    .state('charList',   {url:'/character-list',   templateUrl:'views/character/list.html',   controller:'CharCtrl'});

    $localForageProvider.config({name:'tabletop', storeName:'cache', version:1.0});
    $httpProvider.interceptors.push('HttpInterceptor');
  }])
  .run(['User', '$rootScope', function(User, $rootScope){

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    });

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
    });

  }]);
})();
