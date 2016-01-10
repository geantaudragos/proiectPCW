(function(){
  angular.module('travelDiary')
    .config(exceptionConfig);

  exceptionConfig.$inject = ['$provide'];

  function exceptionConfig ($provide) {
    $provide.decorator('$exceptionHandler', extendExceptionHandler);
  }

  extendExceptionHandler.$inject = ['$delegate', 'toastr'];

  function extendExceptionHandler($delegate, toastr) {
    return function (exception, cause) {
      $delegate(exception,cause);
      var errorData = {
        exception: exception,
        cause: cause
      };

      toastr.error(exception.msg, errorData);
    }
  }
})();
