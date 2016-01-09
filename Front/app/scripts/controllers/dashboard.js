'use strict';


angular.module('travelDiary')
  .controller('DashboardCtrl', ['$scope', 'NgMap', '$timeout', 'StreetView', '$http', 'AuthenticationService',
    function($scope, NgMap, timeout, StreetView, $http, AuthenticationService){
      var vm = this;
      vm.locations = [];
      var locations = [];

      var userInfo = AuthenticationService.getUserInfo();
      $scope.userName = userInfo.name;
      /**
       * Logout Method
       */
      $scope.logout = function () {

        AuthenticationService.logout()
          .then(function (result) {
            $scope.userInfo = null;
            $location.path("/login");
          }, function (error) {
            console.log(error);
          });
      };

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


          $http.get('http://api.localhost:3000/v1/user/' + userInfo.id + '/locations')
            .then(function(response){
              // Parsing stupid response
            var entries = angular.fromJson(response.data);

            angular.forEach(entries, function(entry, key){
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
            $scope.getLocationsOnSpecificDate = function(){
              var detailsModal = $('#myModal');
              var title = detailsModal.find('.modal-title');
              var body = detailsModal.find('.modal-body');
              console.log(body, title, detailsModal);
              title.append("<input id='newYear' class='form-control' type='number' ng-model='year' placeholder='Type in the year'>");

              $('#newYear').on('keypress',function(e){
                var code = e.keyCode || e.which;
                if(code == 13) { //Enter keycode
                  var params = {
                    'year' : $('#newYear').val()
                  };

                  $.get('http://api.localhost:3000/v1/user/' + userInfo.id + '/most_traveled_period', params, function(response){
                    if(!response) {
                      body.html('You have no locations for the specified year');
                    } else {
                      var tempResp = angular.fromJson(response)[0];
                      body.html('In ' + tempResp.Month + ' ' + $('#newYear').val() +  ' you have left the city ' + tempResp.Number + ' times');
                    }
                  });
                }

              });
              detailsModal.modal('show');
              //$.get('url',year,function(response){
              //  var data = angular.fromJson(response);
              //  var detailsModal = $('#myModal');
              //  var title = detailsModal.find('.modal-title');
              //  var body = detailsModal.find('.modal-body');
              //
              //  title.append('Your most travelled month was:');
              //  title.append('<strong>' + data.month + '<strong>');
              //  title.append("You've been in " + '<b>' + data.noOfPlaces + '</b>' + ' during that period');
              //
              //});

            };

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
              }


              $scope.getMostVisitedCities = function() {
                $http.get('http://api.localhost:3000/v1/user/' + userInfo.id + '/most_visited_cities')
                  .then(function (response) {
                    var places = angular.fromJson(response.data);
                    var detailsModal = $('#myModal');
                    var title = detailsModal.find('.modal-title');
                    var body = detailsModal.find('.modal-body');
                    // console.log(response);
                    title.append('Your most visited cities are: ');
                    console.log(places);
                    angular.forEach(places, function (place) {
                      body.append('<h3>' + place.city + '</h3>');
                    });

                    detailsModal.modal('show');

                  });
              };


          });


      });
  }]);


