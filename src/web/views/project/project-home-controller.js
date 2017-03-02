(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('ProjectHomeController', ProjectHomeController);

  ProjectHomeController.$inject = ['$state', 'projectApiService'];

  function ProjectHomeController($state, projectApiService) {
    var vm = this;

    activate();

    function activate() {
      findProject($state.params.projectKey);
    }

    function findProject(key) {
      return projectApiService.findByKey(key)
        .then(function(result) {
          vm.project = result.data;

          return result;
        });
    }
  }
})(angular);
