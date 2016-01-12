(function() {
  'use strict';

  angular.module('travelDiary')
    .factory('UserService', UserService);

  UserService.$inject = ['AuthenticationService', '$location', '$window', 'RequestService', '$q'];

  function UserService (AuthenticationService, $location, $window, RequestService, $q) {
    var userInfo = AuthenticationService.getUserInfo();

    return {
      userInfo : userInfo,
      FacebookLogin : FacebookLogin,
      logout : logout,
      getLocations : getLocations,
      getData : getData,
    };

    function FacebookLogin() {
      AuthenticationService.facebookLogin()
        .then(function (result) {
            userInfo = result;
            $location.path("/dashboard");
          },
          function (error) {
            $window.alert("Invalid credentials");
            console.log("error");
          });
    }

    function logout() {
      console.log('logout');
      AuthenticationService.logout()
        .then(function (result) {
          userInfo = null;
          $location.path("/login");
        }, function (error) {
          console.log(error);
        });
    }

    function getLocations() {

    }

    function getData(request) {
      var deferred = $q.defer();
      var options = {
        method : 'GET',
        params : request.params,
        endpoint : request.location
      };

      RequestService.make(options)
        .then(function(result){
          console.log(result);
          deferred.resolve(result);
        },function (error) {
          deferred.reject(error);
        $window.alert("Invalid credentials");
        console.log("error");
      });
      //'http://api.localhost:3000/v1/user/' + userInfo.id + '/most_traveled_period', params,
      return deferred.promise;
    }


  }
})();
