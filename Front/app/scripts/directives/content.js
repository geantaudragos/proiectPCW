(function(){
  'use strict';

  angular.module('travelDiary')
    .directive('content', ContentDirective);

  function ContentDirective() {
    return {
      restrict    : 'E',
      transclude  : true,
      replace     : true,
      templateUrl : '../../views/content.html',
      link        : function(scope, el, attrs, ctrl, transclude) {
        el.find('.result').append(transclude());
      }
    };
  }

})();
