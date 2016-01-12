(function(){
  'use strict';

  angular
    .module('travelDiary')
    .directive('citiesModal',citiesModalDirective);

  function citiesModalDirective () {
    return {
      templateURL  : '../views/cities-modal.html',
      restrict     : 'E',
      transclude   : true,
      replace      : true,
      controller   : 'CitiesModalController',
      controllerAs : 'citiesModal',
      link : function(scope, el, attrs, ctrl, transclude) {

      }
    };
  }


})();
