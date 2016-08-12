(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('tokenApiService', tokenApiService);

  tokenApiService.$inject = ['$http', 'settings'];

  function tokenApiService($http, settings) {
    var PATH_TO_SERVICE = settings.API.URL + 'token';

    var service = {
      generate: generate
    };

    return service;

    function generate(user) {
      var payload = user;
      return $http.post(PATH_TO_SERVICE, payload);
    }
  }
})(angular);
