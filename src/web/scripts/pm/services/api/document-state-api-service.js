(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('documentStateApiService', documentStateApiService);

  documentStateApiService.$inject = ['$http', 'settings'];

  function documentStateApiService($http, settings) {
    var PATH_TO_SERVICE = settings.API.URL + 'document/state/';

    var service = {
      create: create,
      delete: delet,
      detail: detail,
      search: search,
      update: update
    };

    return service;

    function create(documentState) {
      var payload = documentState;
      return $http.post(PATH_TO_SERVICE, payload);
    }

    function detail(id) {
      return $http.get(PATH_TO_SERVICE + id);
    }

    function delet(id) {
      return $http.delete(PATH_TO_SERVICE + id);
    }

    function search(parameters) {
      return $http.get(PATH_TO_SERVICE + 'search', {
        params: parameters
      });
    }

    function update(id, documentState) {
      var payload = documentState;
      return $http.put(PATH_TO_SERVICE + id, payload);
    }
  }
})(angular);
