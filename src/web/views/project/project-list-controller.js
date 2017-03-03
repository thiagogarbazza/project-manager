(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('ProjectListController', ProjectListController);

  ProjectListController.$inject = ['projectApiService'];

  function ProjectListController(projectApiService) {
    var vm = this;

    vm.search = search;

    activate();

    function activate() {
      search();
    }

    function search(parameters) {
      return projectApiService.search(parameters)
        .then(successOnSearch);

      function successOnSearch(response) {
        vm.projects = response.data;
      }
    }
  }
})(angular);
