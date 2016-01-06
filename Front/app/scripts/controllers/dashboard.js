'use strict';


angular.module('travelDiary')
  .controller('DashboardCtrl', ['$scope', 'NgMap',
    function($scope, NgMap){
      $scope.center = "[40.74, -74.18]";
      NgMap.getMap().then(function(map){
        console.log(map.getCenter);
      });
  }]);


