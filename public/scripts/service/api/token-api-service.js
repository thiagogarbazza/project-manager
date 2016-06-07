(function (angular) {
  'use strict';

  function error(response){
    console.log('Error', response);
  }

  var module = angular.module('app');

  module.service('TokenApiService', [
    '$http', 'config',
    function TokenApiService($http, config) {
      var PATH_TO_SERVICE = config.serviceAPI.url + 'token';

      function _generate(user, success, error) {
        var payload = user;
        return $http.post(PATH_TO_SERVICE, payload).then(success, error);
      }

      return {
        "generate": _generate
      };
    }
  ]);
})(window.angular);
