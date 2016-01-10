(function (){
  "use strict";

  angular.module('travelDiary')
    .directive('mainNav', mainNav);

  function mainNav() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      controller: 'mainNavController',
      controllerAs: 'navigation',
      templateUrl: '../../views/main-nav.html'
    };
  }
})();
