(function () {
  'use strict';

  angular.module('travelDiary')
    .service('RequestService', RequestService);

  RequestService.$inject = ['$http'];

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
      //Add custom endpoints
      this.endpoints = {
        user  : 'user',
        login : 'user/login',
        locations : 'locations.json',
        month : 'month.json'
      };

      //this.apiBase = 'http://api.localhost:3000/v1/';
      //this.apiBase = 'https://spreadsheets.google.com/feeds/list/1yfhNvvL53M0IoipZUn4cwReUe68XiBklztZX0NhiQHM/1/public/basic?alt=json-in-script&callback=JSON_CALLBACK';
      this.apiBase = '../';
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

