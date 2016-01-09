'use strict';

/**
 * @ngdoc function
 * @name travelDiary.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the travelDiary
 */
angular.module('travelDiary')
  .controller('MainCtrl', function ($scope, $rootScope, $http, $location, Facebook, $timeout, AuthenticationService) {
    $rootScope.user = {
      name : 'User'
    };
    $scope.facebookLogin = function () {
      AuthenticationService.facebookLogin()
        .then(function(result){
          $scope.userInfo = result;
            $scope.toggleModal();
          $timeout(function() {
            $location.path("/dashboard");
          }, 1000);
          },
         function(error) {
              $window.alert("Invalid credentials");
              console.log("error");
      });
    };

    $scope.getLoginStatus = function() {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $scope.loggedIn = true;
        } else {
          $scope.loggedIn = false;
        }
      });
    };

    $scope.me = function() {
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

    $scope.getDetail = function() {
      for (var i = 0; i < $scope.details.length; i++) {
        if($scope.details[i].show === true) {
          if(i == $scope.details.length-1) {
            $scope.details[i].show = false;
            $scope.details[0].show = true;
          } else {
            $scope.details[i+1].show = true;
            $scope.details[i].show = false;
            i = i+1;
          }
        }
      }
    };

    $scope.showModal = false;
    $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };
  });

