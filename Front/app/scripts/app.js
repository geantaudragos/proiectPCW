"use strict";

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
    'ngMap',
    'facebook'
  ])
  .config(['$routeProvider', 'FacebookProvider', '$httpProvider',
          function ($routeProvider, FacebookProvider, $httpProvider) {

            $routeProvider
              .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainController',
                controllerAs: 'main'
              })
              .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl',
                controllerAs: 'about'
              })
              .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard',
                resolve : {
                  auth: ["$q", "AuthenticationService", function($q, AuthenticationService) {
                    var userInfo = AuthenticationService.getUserInfo();

                    if (userInfo) {
                      return $q.when(userInfo);
                    } else {
                      return $q.reject({ authenticated: false });
                    }
                  }]
                }
              })
              .otherwise({
                redirectTo: '/'
              });

            FacebookProvider.init('160977360928968');
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
            $httpProvider.defaults.useXDomain = true;

          }])
  .run(['$rootScope', '$location','$cookieStore','$http',
        function($rootScope, $location, $cookieStore, $http){
          $rootScope.$on('$locationChangeStart', function(event){
            switch($location.$$path) {
              case '/':
                    $rootScope.background = 'cover main';
                    $rootScope.home = 'active';
                    break;
              case '/dashboard':
                    $rootScope.background = 'full-screen';
                    break;
              default:
                    $rootScope.background = 'cover main';
            }


          });

          $rootScope.$on("$routeChangeSuccess", function(userInfo) {
            //console.log(userInfo);
          });

          $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
            if (eventObj.authenticated === false) {
              $location.path("/login");
            }
          });
        }]);


var handligRouteChangeError = false;

/**
 * @desc Route cancellation function
 */
function handleRoutingChangeErrors() {
  /**
   * Route cancellation:
   * On routing error, go to the dashboard.
   * Provide an exit clause if it tries to do it twice
   */

  $rootScope.$on('$routeChangeError',
    function(event, current, previous, rejection) {
      if (handlingRouteChangeError) { return; }
      handlingRouteChangeError = true;
      var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) || 'unknown target';
      var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');

        /**
         * Optional logging ($log)
         */

        /**
         * On routing error, go to another route/state
         */
      $location.path('/');
    }
  );
}
