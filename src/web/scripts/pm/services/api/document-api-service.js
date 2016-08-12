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
      loadTemplate: loadTemplate,
      search: search,
      update: update
    };

    return service;

    function create(document) {
      var payload = document;
      return $http.post(PATH_TO_SERVICE, payload);
    }

    function delet(id) {
      return $http.delete(PATH_TO_SERVICE + id);
    }

    function detail(id) {
      return $http.get(PATH_TO_SERVICE + id);
    }

    function loadTemplate(file) {
      return $http.get(config.serviceAPI.url + 'views/document/templates/' + file);
    }

    function search(parameters) {
      return $http.get(PATH_TO_SERVICE + 'search', {
        params: parameters
      });
    }

    function update(id, document) {
      var payload = document;
      return $http.put(PATH_TO_SERVICE + id, payload);
    }
  }
})(angular);
