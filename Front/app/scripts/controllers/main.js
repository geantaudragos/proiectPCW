'use strict';

/**
 * @ngdoc function
 * @name travelDiary.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the travelDiary
 */
angular.module('travelDiary')
  .controller('MainCtrl', function ($scope, $rootScope, $http, $location, Facebook) {
    $scope.something='sdada';
    $scope.login = function() {
      console.log('wqdw');
      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
          var accesToken = response.authResponse.accessToken;
          Facebook.api(
            '/me?fields=email,name',
            'GET',
            {access_token:accesToken},
            function(response) {
              $.post("http://api.localhost:3000/v1/user/login", response, function(data){
                  console.log(data);
                  $location.path('/dashboard');
              });
              console.log(response);
            }
          );



      },
        {scope: 'email, user_hometown, user_photos, user_tagged_places'});
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
      console.log($scope.showModal);
    };
  });

