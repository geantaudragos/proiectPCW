(function () {
  'use strict';

  angular.module('travelDiary')
    .service('RequestService', RequestService);

  RequestService.$inject = ['$http', 'AuthenticationService'];

  /**
   * @name RequestService
   * @desc Service that builds a new api request
   * @param $http
   * @returns {Request}
   * @constructor
   */
  function RequestService ($http, AuthenticationService) {

    var Request = function() {

      //Convenience helpers
      //Add custom endpoints
      this.endpoints = {
        login : '/login',
        locations : '/locations',
        month : '/most_traveled_period',
        cities: '/most_visited_cities',
        places: '/most_visited_places',
        photos: '/photos'
      };

      var userId = AuthenticationService.getUserInfo().id;

      this.apiBase = 'http://api.localhost:3000/v1/user/';

      this.make = function(options) {
        var url = this.apiBase;

        //resolve URL
        if (this.endpoints.hasOwnProperty(options.endpoint)) {
          url += userId;
          url += this.endpoints[options.endpoint];

        }

        // return a new request object
        return new HTTP(url, options);
      };

      return this;
    };

    // XHR object - gets a new instance with every request
    var HTTP = function(url, opts){
      console.log(opts);
      return $http({
        method : opts.method,
        url    : url,
        params : opts.params,
        data   : opts.data
      });
    };

    return new Request();
  }

})();

