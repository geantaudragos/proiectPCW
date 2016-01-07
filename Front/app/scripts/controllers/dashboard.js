'use strict';


angular.module('travelDiary')
  .controller('DashboardCtrl', ['$scope', 'NgMap', '$timeout', 'StreetView', '$http',
    function($scope, NgMap, timeout, StreetView, $http){
      var vm = this;
      vm.locations = [];
      var locations = [];

      $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
        console.log($scope.showModal);
      };
      $scope.showPinDetails = false;
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

            angular.forEach(locations, function(location, key){
              var place = location;
              place.position = new google.maps.LatLng(location.latitude, location.longitude);
              place.title    = place.name;
              var marker     = new google.maps.Marker(place);
              marker.addListener('click', function(){
                //$scope.showPinDetails = !$scope.showPinDetails;
                console.log($scope.showPinDetails);
                $('#myModal').modal('show');

              });
              vm.locations.push(marker);
            });

            vm.markerClusterer = new MarkerClusterer(map, vm.locations, {});
            console.log(vm.markerClusterer);
            console.log(vm);
            $scope.getLocationsOnSpecificDate = function(year, month, day){
              console.log('i am here');
              vm.markerClusterer.fitMapToMarkers();
            };
          });


      });
  }]);


