(function (angular, undefined) {
  'use strict';

  function error(response){
    console.log('Error', response);
  }

  var module = angular.module('app');

  module.service('DocumentStateApiService', [
    '$http', 'config',
    function DocumentStateApiService($http, config) {
      var PATH_TO_SERVICE = config.serviceAPI.url + 'service/document/state/';

      function _update(id, DocumentStates, success) {
        var payload = DocumentStates;
        return $http.put(PATH_TO_SERVICE + id, payload).then(success, error);
      }

      function _detail(id, success) {
        return $http.get(PATH_TO_SERVICE + id).then(success, error);
      }

      function _create(DocumentStates, success) {
        var payload = DocumentStates;
        return $http.post(PATH_TO_SERVICE, payload).then(success, error);
      }

      function _delete(id, success) {
        return $http.delete(PATH_TO_SERVICE + id).then(success, error);
      }

      function _search(parameters, success) {
        return $http.get(PATH_TO_SERVICE + 'search',  {params: parameters}).then(success, error);
      }

      return {
        "update": _update,
        "detail": _detail,
        "create": _create,
        "delete": _delete,
        "search": _search
      };
    }
  ]);
})(window.angular);
