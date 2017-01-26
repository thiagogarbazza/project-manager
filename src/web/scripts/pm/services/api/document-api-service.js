(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('documentApiService', documentApiService);

  documentApiService.$inject = ['$http', 'settings'];

  function documentApiService($http, settings) {
    var PATH_TO_SERVICE = settings.API.URL + 'document/';

    var service = {
      create: create,
      delete: delet,
      detail: detail,
      search: search,
      update: update
    };

    return service;

    function create(document) {
      return $http.post(PATH_TO_SERVICE, document);
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

    function update(id, document) {
      return $http.put(PATH_TO_SERVICE + '/' + id, document);
    }
  }
})(angular);
