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

  MainController.$inject = ['$scope', '$rootScope', '$http', '$location', 'Facebook', '$timeout', 'AuthenticationService',];

  function MainController ($scope, $rootScope, $http, $location, Facebook, $timeout, AuthenticationService) {
    var vm        = this;
    vm.getContent = getContent;
    vm.content    = {
      'home'     : true,
      'about'    : false,
      'features' : false,
      'contact'  : false
    };
    vm.contentList = ['home', 'about', 'features', 'content'];

    $rootScope.user = {
      name: 'User'
    };

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

    $scope.facebookLogin = function () {
      AuthenticationService.facebookLogin()
        .then(function (result) {
            $scope.userInfo = result;
            $scope.toggleModal();
            $timeout(function () {
              $location.path("/dashboard");
            }, 1000);
          },
          function (error) {
            $window.alert("Invalid credentials");
            console.log("error");
          });
    };

    $scope.getLoginStatus = function () {
      Facebook.getLoginStatus(function (response) {
        if (response.status === 'connected') {
          $scope.loggedIn = true;
        } else {
          $scope.loggedIn = false;
        }
      });
    };

    $scope.me = function () {
      Facebook.api('/me', function (response) {
        $scope.user = response;
      });
    };


    $rootScope.canvas = '.cover .main';
    $scope.details = [
      {
        text: 'Something nice',
        show: true
      },
      {
        text: 'Something Beautiful',
        show: false
      },
      {
        text: 'Something Incredible',
        show: false
      }
    ];

    $scope.getDetail = function () {
      for (var i = 0; i < $scope.details.length; i++) {
        if ($scope.details[i].show === true) {
          if (i === $scope.details.length - 1) {
            $scope.details[i].show = false;
            $scope.details[0].show = true;
          } else {
            $scope.details[i + 1].show = true;
            $scope.details[i].show = false;
            i = i + 1;
          }
        }
      }
    };

    $scope.showModal = false;
    $scope.toggleModal = function () {
      $scope.showModal = !$scope.showModal;
    };
  }
})();

