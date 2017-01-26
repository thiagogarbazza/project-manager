(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('tokenApiService', tokenApiService);

  tokenApiService.$inject = ['$http', 'settings'];

  function tokenApiService($http, settings) {
    var PATH_TO_SERVICE = settings.API.URL + 'security/token';

    var service = {
      generate: generate
    };

    return service;

    function generate(user) {
      return $http.post(PATH_TO_SERVICE, user);
    }
  }
})(angular);
