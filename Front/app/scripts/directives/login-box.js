(function (){
  'use strict';

  angular.module('travelDiary')
    .directive('loginBox',loginBox);

  function loginBox () {
    return {
      restrict : 'E',
      transclude: true,
      replace: true,
      controller : 'loginController',
      controllerAs : 'login',
      templateUrl :'../../views/login-box.html'
    };
  }
})();
