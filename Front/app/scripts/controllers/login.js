(function(){
"use strict";

angular.module('travelDiary')
  .controller('loginController', loginController);


function loginController ($scope, Facebook){

    //$scope.something='sdada';
    //$scope.login = function() {
    //  console.log('wqdw');
    //  // From now on you can use the Facebook service just as Facebook api says
    //  Facebook.login(function(response) {
    //    // Do something with response.
    //    console.log(response);
    //  });
    //};
    //
    //$scope.getLoginStatus = function() {
    //  Facebook.getLoginStatus(function(response) {
    //    if(response.status === 'connected') {
    //      $scope.loggedIn = true;
    //    } else {
    //      $scope.loggedIn = false;
    //    }
    //  });
    //};
    //
    //$scope.me = function() {
    //  Facebook.api('/me', function (response) {
    //    $scope.user = response;
    //  });
    //};
}
})();
