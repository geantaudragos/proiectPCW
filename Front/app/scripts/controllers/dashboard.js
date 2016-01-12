(function() {

'use strict';


angular.module('travelDiary')
  .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'NgMap', '$http', 'AuthenticationService', 'UserService', 'RequestService'];

    function DashboardController ($scope, NgMap, $http, AuthenticationService, UserService, RequestService) {
      var vm = this;
      vm.locations = [];
      var locations = [];
      vm.logout = UserService.logout();
      vm.userInfo = AuthenticationService.getUserInfo();
      vm.getLocationsOnSpecificDate = function () { vm.mostVisitedMonth = !vm.mostVisitedMonth; };
      vm.getMostVisitedCities = function () {
        vm.mostVisitedCities = !vm.mostVisitedCities;
        var request = {
          params : {},
          location : 'cities'
        };
        UserService.getData(request);
      };
      vm.getMostVisitedPlaces = function () { vm.mostVisitedPlaces = !vm.mostVisitedPlaces; };
      /**
       * Toggle modal method
       */
      $scope.toggleModal = function(){
        $("#myModal").modal('show');
      };

      $("#myModal").on('hidden.bs.modal', function(e){
        $('.modal-title').html('');
        $('.modal-body').html('');
      });


      function createaModal(data, title, body) {
        var myModal = $('#myModal');
      }


      /**
         * Map Logic
         */
        NgMap.getMap().then(function(map){
          vm.map = map;

          var options = {
            method : 'GET',
            endpoint : 'locations'
          };

          RequestService.make(options)
          .then(function(response){
            angular.forEach(response.data, function(entry, key){
              locations.push({
                name       : entry.name,
                longitude  : entry.longitude,
                latitude   : entry.latitude,
                city       : entry.city
              });
            });


            /** Adding markers on the map
             * Adding event listeners on every marker
             */
            angular.forEach(locations, function(location, key){
              var place = location;
              place.position = new google.maps.LatLng(location.latitude, location.longitude);
              place.title    = place.name;
              var marker     = new google.maps.Marker(place);
              marker.addListener('click', function(){
                var detailsModal = $('#myModal');
                var title = detailsModal.find('.modal-title');
                var body = detailsModal.find('.modal-body');

                title.append(marker.title);
                body.append(marker.name);
                body.append(marker.longitude);
                body.append(marker.latitude);
                detailsModal.modal('show');
              });
              vm.locations.push(marker);
            });

            vm.markerClusterer = new MarkerClusterer(map, vm.locations, {});
            vm.markerClusterer.fitMapToMarkers();
            $scope.year = 2014;

              $scope.getDateLocations = function(year) {
                console.log(year);
              };
              $scope.getMostVisitedPlaces = function() {
                $http.get('http://api.localhost:3000/v1/user/' + userInfo.id + '/most_visited_places')
                  .then(function(response){
                    var places = angular.fromJson(response.data);
                    var detailsModal = $('#myModal');
                    var title = detailsModal.find('.modal-title');
                    var body = detailsModal.find('.modal-body');
                   // console.log(response);
                    title.append('Your most visited places are: ');
                   // console.log(places);
                    angular.forEach(places, function(place){
                      body.append(place.name + ' has been visited ' + place.Visits + '<br>');
                    });

                    detailsModal.modal('show');

                  });
              };

          });


      });
  }
})();
