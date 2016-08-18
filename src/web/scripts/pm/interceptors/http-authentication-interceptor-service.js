(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('httpAuthenticationInterceptor', httpAuthenticationInterceptor);

  httpAuthenticationInterceptor.$inject = ['userService'];

  function httpAuthenticationInterceptor(userService) {
    var service = {
      request: request
    };

    return service;

    function request(config) {
      config.headers.Authorization = 'JWT ' + userService.get().token;
      return config;
    }
  }
})(angular);
