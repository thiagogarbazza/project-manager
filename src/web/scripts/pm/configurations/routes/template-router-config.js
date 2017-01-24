(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(templateRouterConfiguration);

  templateRouterConfiguration.$inject = ['$stateProvider'];

  function templateRouterConfiguration($stateProvider) {
    $stateProvider.state('template', {
      abstract: true,
      parent: 'root',
      templateUrl: 'views/template/template-tpl.html'
    });
  }
})(angular);
