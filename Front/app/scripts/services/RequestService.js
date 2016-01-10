(function () {
  'use strict';

  angular.module('travelDiary')
    .service('RequestService', RequestService);


// using $inject to manually identify our dependencies
// in order to avoid minification issues
  RequestService.$inject(['$http']);

  /**
   * @name RequestService
   * @desc Service that builds a new api request
   * @param $http
   * @returns {Request}
   * @constructor
   */
  function RequestService ($http) {

    var Request = function() {

      //Convenience helpers
      this.endpoints = {
        user  : 'user',
        login : 'user/login'
      };

      this.apiBase = 'http://api.localhost:3000/v1/';

      this.make = function(options) {
        var url = this.apiBase;

        //resolve URL
        if (this.endpoints.hasOwnProperty(options.endpoint)) {
          url += this.endpoints[options.endpoint];
        }

        // return a new request object
        return new HTTP(url, options);
      };

      return this;
    };

    // XHR object - gets a new instance with every request
    var HTTP = function(url, opts){
      return $http({
        method : opts.method,
        url    : url,
        data   : opts.data
      });
    };

    return new Request();
  }

})();

