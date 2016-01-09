'use strict';

angular.module('travelDiary')
  .factory('AuthenticationService', function($http, $q, $window, Facebook){
    var userInfo;

    function facebookLogin() {
      var deferred = $q.defer();

      Facebook.login(function(response) {
        var loginParams = response.authResponse;
        var accessToken = loginParams.accessToken;
        Facebook.api(
          '/me?fields=email,name,hometown',
          'GET',
          {
            access_token:accessToken
          },
          function ( response ) {
            var userParams = response;

            $.post("http://api.localhost:3000/v1/user/login", {'userParams':userParams, 'loginParams':loginParams}, function(data){
              var info = angular.fromJson(data);

              userInfo = {
                name  : info.name,
                id    : info.id,
                noOfLocations : info.locations
              };
              $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
              deferred.resolve(userInfo);
            });
          }
        );
      });

     // $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      deferred.resolve(userInfo);
      return deferred.promise;
    }

    function getUserInfo() {
      return userInfo;
    }

    function logout() {
      var deferred = $q.defer();

      $http({
        method: "POST",
        url: "/api/logout",
        headers: {
          "access_token": userInfo.accessToken
        }
      }).then(function (result) {
        userInfo = null;
        $window.sessionStorage["userInfo"] = null;
        deferred.resolve(result);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function init() {
      if ($window.sessionStorage["userInfo"]) {
        userInfo = JSON.parse($window.sessionStorage["userInfo"]);
      }
    }
    init();

    return {
      facebookLogin: facebookLogin,
      getUserInfo: getUserInfo,
      logout: logout
    };
  });
