(function(){
  'use strict';

  angular
    .module('travelDiary')
    .factory('MapService', MapService);

  MapService.$inject = ['UserService'];

  function MapService(UserService) {

  }
})();
