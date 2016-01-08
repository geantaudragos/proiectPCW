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
  .directive('modal', function() {
  return {
    template: '<div class="modal fade">' +
    '<div class="modal-dialog">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
    '<h4 class="modal-title">{{ title }}</h4>' +
    '</div>' +
    '<div class="modal-body" ng-transclude></div>' +
    '</div>' +
    '</div>' +
    '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value){
        if(value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
})
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
        }]);
