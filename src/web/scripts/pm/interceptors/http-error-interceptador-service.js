(function(angular, HttpStatus) {
  'use strict';

  angular
    .module('pm')
    .factory('httpErrorInterceptador', httpErrorInterceptador);

  httpErrorInterceptador.$inject = ['$location', '$q', '$rootScope'];

  function httpErrorInterceptador($location, $q, $rootScope) {
    var service = {
      responseError: responseError
    };

    return service;

    function responseError(response) {
      switch (response.status) {
        case HttpStatus.INTERNAL_SERVER_ERROR:
          $location.path('/500');
          break;
        case HttpStatus.NOT_FOUND:
          $location.path('/404');
          break;
        case HttpStatus.PRECONDITION_FAILED:
          $rootScope.$broadcast('uiFbViolacoes', response.data);
          break;
        default:
          break;
      }

      return $q.reject(response);
    }
  }
})(angular, httpStatusCode);
