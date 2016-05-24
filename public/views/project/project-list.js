(function(angular, undefined){
  'use strict';

  var module = angular.module('app');

  module.controller('ProjectListController', [
    '$location', '$stateParams', 'ProjectApiService',
    function ProjectListController($location, $stateParams, projectApiService) {
      var self = this;

      function loading() {
        var parameters = $stateParams;
        self.searchParameters = parameters;
        search(parameters);
      }

      function reset() {
        self.projects = undefined;
      }

      function search(parameters){
        $location.search(parameters);
        reset();
        projectApiService.search(parameters, function successSearch(resource) {
          self.projects = resource.data;
        });
      }

      self.search = search;
      loading();
    }
  ]);

})(window.angular);
