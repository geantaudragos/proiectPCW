(function(){
  'use strict';

  angular
    .module('travelDiary')
    .directive('placesModal',PlacesModalDirective);

  function PlacesModalDirective () {
    return {
      restrict     : 'E',
      transclude   : true,
      replace      : true,
      controller   : 'PlacesModalController',
      controllerAs : 'placesModal',
      templateURL  : '../views/places-modal.html',
      link : function(scope, el, attrs, ctrl, transclude) {
        el.find('.details').append(transclude());

      }
    };
  }


})();
