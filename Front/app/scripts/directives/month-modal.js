(function(){
  angular
    .module('travelDiary')
    .directive('monthModal', monthModalDirective);

  function monthModalDirective() {
    return {
      templateUrl : '../views/month-modal.html',
      transclude : true,
      replace : true,
      restrict : 'E',
      controller : 'MonthModalController',
      controllerAs : 'monthModal',
      link : function(scope, el, attrs, ctrl, transclude) {


      }
    };
  }

})();
