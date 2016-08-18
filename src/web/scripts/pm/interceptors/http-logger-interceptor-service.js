(function(angular) {
  'use strict';

  var SEPARADOR = '->';

  angular
    .module('pm')
    .factory('httpLoggerInterceptor', httpLoggerInterceptor);

  httpLoggerInterceptor.$inject = ['$log', '$q'];

  function httpLoggerInterceptor($log, $q) {
    var service = {
      request: onRequest,
      requestError: onRequestError,
      response: onResponse,
      responseError: onResponseError
    };

    return service;

    function onRequest(config) {
      $log.debug(config.method, SEPARADOR, config.url);
      return config;
    }

    function onRequestError(rejection) {
      $log.error('Erro no request', SEPARADOR, rejection);
      return $q.reject(rejection);
    }

    function onResponse(response) {
      // $log.debug('Retorno chamanda', SEPARADOR, response);
      return response;
    }

    function onResponseError(rejection) {
      $log.error('Recurso não encontrado', SEPARADOR, rejection);
      return $q.reject(rejection);
    }
  }
})(angular);
