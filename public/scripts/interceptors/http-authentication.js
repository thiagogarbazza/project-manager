(function(angular, undefined) {
  'use strict';

  //https://github.com/witoldsz/angular-http-auth/blob/master/src/http-auth-interceptor.js

  var module = angular.module('app');

  module.factory('HTTPAuthenticationInterceptor', [
    '$localStorage', '$log',
    function HTTPAuthenticationInterceptor($localStorage, $log) {

      var userStorage = $localStorage.$default({user: {}}).user;

      function request(config) {
        config.headers['Authorization'] = 'JWT ' + userStorage.token;
        return config;
      }

      return {
        "request": request
      };
    }
  ]);

  module.config([
    '$httpProvider',
    function httpLoggerConfiguration($httpProvider) {
      $httpProvider.interceptors.push('HTTPAuthenticationInterceptor');
    }
  ]);
}(window.angular));
