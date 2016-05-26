(function(angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.factory('HTTPLoggerInterceptor', [
    '$q', '$log',
    function HTTPLoggerInterceptor($q, $log) {

      function request(config) {
        $log.debug(config.method, '->', config.url);
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
      $httpProvider.interceptors.push('HTTPLoggerInterceptor');
    }
  ]);
}(window.angular));
