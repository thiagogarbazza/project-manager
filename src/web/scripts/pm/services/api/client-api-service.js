(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('clientApiService', clientApiService);

  clientApiService.$inject = ['$http', 'settings'];

  function clientApiService($http, settings) {
    var PATH_TO_SERVICE = settings.API.URL + 'client';

    var service = {
      create: create,
      delete: delet,
      detail: detail,
      search: search,
      update: update
    };

    return service;

    function create(client) {
      return $http.post(PATH_TO_SERVICE, client);
    }

    function delet(id) {
      return $http.delete(PATH_TO_SERVICE + '/' + id);
    }

    function detail(id) {
      return $http.get(PATH_TO_SERVICE + '/' + id);
    }

    function search(parameters) {
      return $http.get(PATH_TO_SERVICE, {params: parameters});
    }

    function update(id, client) {
      return $http.put(PATH_TO_SERVICE + '/' + id, client);
    }
  }
})(angular);
