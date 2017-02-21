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
        template: 'My project page.....',
        url: '/{code}'
      })
      .state('project.documentation', {
        parent: 'template',
        template: 'My project documentation page.....',
        url: '/{code}/docs'
      })
      .state('project.iteration', {
        parent: 'template',
        template: 'My project iteration page.....',
        url: '/{code}/iteration'
      });
  }
})(angular);
