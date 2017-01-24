(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(rootRouterConfiguration);

  rootRouterConfiguration.$inject = ['$stateProvider'];

  function rootRouterConfiguration($stateProvider) {
    $stateProvider.state('root', {
      abstract: true,
      template: '<ui-view></ui-view>'
    });
  }
})(angular);
