'use strict';

/**
 * @ngdoc function
 * @name travelDiary.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the travelDiary
 */
angular.module('travelDiary')
  .controller('MainCtrl', function ($scope, $rootScope) {
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
      console.log($scope.showModal);
    };
  });

