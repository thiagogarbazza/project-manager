(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('projectApiService', projectApiService);

  projectApiService.$inject = ['$http', 'settings'];

  function projectApiService($http, settings) {
    var PATH_TO_SERVICE = settings.API.URL + 'project/';

    var service = {
      create: create,
      delete: delet,
      detail: detail,
      findByCode: findByCode,
      search: search,
      update: update
    };

    return service;

    function create(project) {
      var payload = project;
      return $http.post(PATH_TO_SERVICE, payload);
    }

    function delet(id) {
      return $http.delete(PATH_TO_SERVICE + id);
    }

    function detail(id) {
      return $http.get(PATH_TO_SERVICE + id);
    }

    function findByCode(code) {
      var parameters = {
        code_eq: code
      };
      return $http.get(PATH_TO_SERVICE + 'search', {
        params: parameters
      });
    }

    function search(parameters) {
      return $http.get(PATH_TO_SERVICE + 'search', {
        params: parameters
      });
    }

    function update(id, project) {
      var payload = project;
      return $http.put(PATH_TO_SERVICE + id, payload);
    }
  }
})(angular);