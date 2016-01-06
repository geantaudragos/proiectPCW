'use strict';

/**
 * @ngdoc overview
 * @name travelFrontApp
 * @description
 * # travelFrontApp
 *
 * Main module of the application.
 */

angular
  .module('travelDiary', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap'
  ])
  .config(['$routeProvider',
          function ($routeProvider) {

            $routeProvider
              .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
              })
              .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
              })
              .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'dashboard'
              })
              .otherwise({
                redirectTo: '/'
              });
  }])
  .run(['$rootScope', '$location','$cookieStore','$http',
        function($rootScope, $location, $cookieStore, $http){
          $rootScope.$on('$locationChangeStart', function(event){
            switch($location.$$path) {
              case '/':
                    $rootScope.background = 'cover main';
                    break;
              case '/dashboard':
                    $rootScope.background = 'cover map';
                    break;
              default:
                    $rootScope.background = 'cover main';
            }
            $rootScope.myLocation = $location.$$path;
            console.log($location.$$path);
          });
        }]);
