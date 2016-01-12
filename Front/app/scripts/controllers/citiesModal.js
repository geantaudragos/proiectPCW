(function(){
  'use strict';

  angular
    .module('travelDiary')
    .controller('CitiesModalController', CitiesModalController);

  CitiesModalController.$inject = ['UserService'];

  function CitiesModalController(UserService) {
    var vm = this;

  }
})();
