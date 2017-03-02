(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(projectRouterConfiguration);

  projectRouterConfiguration.$inject = ['$stateProvider'];

  function projectRouterConfiguration($stateProvider) {
    $stateProvider
      .state('project', {
        parent: 'template',
        templateUrl: 'views/project/project-home-tpl.html',
        url: '/{projectKey}'
      })
      .state('project.documentation', {
        parent: 'template',
        template: 'My project documentation page.....',
        url: '/{projectKey}/docs'
      })
      .state('project.iteration', {
        parent: 'template',
        template: 'My project iteration page.....',
        url: '/{projectKey}/iteration'
      });
  }
})(angular);
