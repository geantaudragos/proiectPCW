(function(){
'use strict';

/**
 * @ngdoc function
 * @name travelDiary.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the travelDiary
 */
angular.module('travelDiary')
  .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$rootScope', 'UserService'];

  function MainController ($scope, $rootScope, UserService) {
    var vm        = this;
    vm.getContent = getContent;
    vm.content    = {
      'home'     : true,
      'about'    : false,
      'features' : false,
      'contact'  : false
    };
    vm.showModal     = false;
    vm.toggleModal   = function () { vm.showModal = !vm.showModal; };
    vm.facebookLogin = function () { UserService.FacebookLogin(); };


    function getContent(element) {
      var data = element.currentTarget.attributes['data'].value;
      if (data !== 'next') {
        if (!vm.content[data]) {
          vm.content.home = vm.content.about = vm.content.features = vm.content.contact = false;
          vm.content[data] = true;
        }
      } else {
        if (vm.content.home === true) {
          vm.content.home = vm.content.about = vm.content.features = vm.content.contact = false;
          vm.content.about = true;
        } else if (vm.content.about === true) {
          vm.content.home = vm.content.about = vm.content.features = vm.content.contact = false;
          vm.content.features = true;
        } else if (vm.content.features === true) {
          vm.content.home = vm.content.about = vm.content.features = vm.content.contact = false;
          vm.content.contact = true;
        } else {
          vm.content.home = vm.content.about = vm.content.features = vm.content.contact = false;
          vm.content.home = true;
        }
      }
    }

    $scope.me = function () {
      Facebook.api('/me', function (response) {
        $scope.user = response;
      });
    };


    $rootScope.canvas = '.cover .main';

  }
})();

