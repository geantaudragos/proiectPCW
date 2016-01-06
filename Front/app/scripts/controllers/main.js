'use strict';

/**
 * @ngdoc function
 * @name travelDiary.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the travelDiary
 */
angular.module('travelDiary')
  .controller('MainCtrl', function ($scope, $rootScope) {
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
  })
  .directive('modal', function() {
    return {
      template: '<div class="modal fade">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
      '<h4 class="modal-title">{{ title }}</h4>' +
      '</div>' +
      '<div class="modal-body" ng-transclude></div>' +
      '</div>' +
      '</div>' +
      '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
