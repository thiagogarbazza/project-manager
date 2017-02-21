(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(settingsRouterConfiguration);

  settingsRouterConfiguration.$inject = ['$stateProvider'];

  function settingsRouterConfiguration($stateProvider) {
    $stateProvider.state('settings', {
      parent: 'template',
      template: '<ui-view></ui-view>',
      url: '/settings'
    });
  }
})(angular);
