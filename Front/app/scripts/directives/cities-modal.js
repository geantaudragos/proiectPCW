(function(){
  'use strict';

  angular
    .module('travelDiary')
    .directive('citiesModal',CitiesModalDirective);

  CitiesModalDirective.$inject = ['UserService'];

  function CitiesModalDirective (UserService) {
    return {
      restrict     : 'E',
      controller   : 'CitiesModalController',
      controllerAs : 'citiesModal',
      templateURL  : '../views/cities-modal.html',
      link : function(scope, el, attrs, ctrl, transclude) {

      }
    };
  }
//
//  $scope.getMostVisitedCities = function() {
//    $http.get('http://api.localhost:3000/v1/user/' + userInfo.id + '/most_visited_cities')
//      .then(function (response) {
//        var places = angular.fromJson(response.data);
//        var detailsModal = $('#myModal');
//        var title = detailsModal.find('.modal-title');
//        var body = detailsModal.find('.modal-body');
//        // console.log(response);
//        title.append('Your most visited cities are: ');
//        console.log(places);
//        angular.forEach(places, function (place) {
//          body.append('<h3>' + place.city + '</h3>');
//        });
//
//        detailsModal.modal('show');
//
//      });
//  };

})();
