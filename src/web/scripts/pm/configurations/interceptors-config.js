(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(interceptorsConfiguration);

  interceptorsConfiguration.$inject = ['$httpProvider'];

  function interceptorsConfiguration($httpProvider) {
    $httpProvider.interceptors.push('httpAuthenticationInterceptor');
    $httpProvider.interceptors.push('httpErrorInterceptador');
    $httpProvider.interceptors.push('httpLoggerInterceptor');
  }
})(angular);
