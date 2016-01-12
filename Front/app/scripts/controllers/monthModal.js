(function(){
  'use strict';

  angular
    .module('travelDiary')
    .controller('MonthModalController', MonthModalController);

  MonthModalController.$inject = ['UserService'];

  function MonthModalController(UserService) {
    var vm = this;
    vm.checkForEnter = checkForEnter;
    vm.display = function () { vm.showResult = !vm.showResult };
    function checkForEnter ($event) {
      var keyCode = $event.which || $event.keyCode;

      var request = {
        params : {
          'year' : vm.year
        },
        location : 'month'
      };
      if(keyCode === 13) {
        UserService.getData(request)
          .then(function(response){
            vm.month = response.data[0].Month;
            vm.number = response.data[0].Number;
            vm.display();
          });

      }
    }
  }
})();
