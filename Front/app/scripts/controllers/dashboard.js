'use strict';


angular.module('travelDiary')
  .controller('DashboardCtrl', ['$scope', 'NgMap', '$timeout', 'StreetView', '$http', 'AuthenticationService',
    function($scope, NgMap, timeout, StreetView, $http, AuthenticationService){
      var vm = this;
      vm.locations = [];
      var locations = [];
      var userInfo = AuthenticationService.getUserInfo();
      $scope.userName = userInfo.name;
      console.log(AuthenticationService.getUserInfo());
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
        console.log('.modal-title');
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

        $http.get('https://spreadsheets.google.com/feeds/list/1yfhNvvL53M0IoipZUn4cwReUe68XiBklztZX0NhiQHM/1/public/basic?alt=json-in-script&callback=JSON_CALLBACK')
          .then(function(response){

            // Parsing stupid response
            var myJson = response.data.replace('// API callback','');
            myJson = myJson.replace('JSON_CALLBACK(','');
            myJson = myJson.substring(0, myJson.length - 2);

            var entries = angular.fromJson(myJson).feed.entry;

            angular.forEach(entries, function(checkIn, key){
              var myData = checkIn.content.$t.split(',');
              //console.log(myData[1].split(' lat: ')[1]);
              locations.push({
                name      : myData[0].split('name: ')[1],
                longitude  : myData[1].split(' lat: ')[1],
                latitude : myData[2].split(' long: ')[1]
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

            $scope.getLocationsOnSpecificDate = function(year){

              $.get('url',year,function(response){
                var data = angular.fromJson(response);
                var detailsModal = $('#myModal');
                var title = detailsModal.find('.modal-title');
                var body = detailsModal.find('.modal-body');

                title.append('Your most travelled month was:');
                title.append('<strong>' + data.month + '<strong>');
                title.append("You've been in " + '<b>' + data.noOfPlaces + '</b>' + ' during that period');

              });

            };
          });


      });
  }]);


