(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('documentTypeApiService', documentTypeApiService);

  documentTypeApiService.$inject = ['$http', 'config'];

  function documentTypeApiService($http, config) {
    var PATH_TO_SERVICE = settings.API.URL + 'document/type/';

    var service = {
      create: create,
      delete: delet,
      detail: detail,
      update: update,
      search: search
    };

    return service;

    function create(documentType) {
      var payload = documentType;
      return $http.post(PATH_TO_SERVICE, payload);
    }

    function delet(id) {
      return $http.delete(PATH_TO_SERVICE + id);
    }

    function detail(id) {
      return $http.get(PATH_TO_SERVICE + id);
    }

    function search(parameters) {
      return $http.get(PATH_TO_SERVICE + 'search', {
        params: parameters
      });
    }

    function update(id, documentType) {
      var payload = documentType;
      return $http.put(PATH_TO_SERVICE + id, payload);
    }
  }
})(angular);
