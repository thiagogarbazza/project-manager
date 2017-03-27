(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(settingsRouterConfiguration);

  settingsRouterConfiguration.$inject = ['$stateProvider'];

  function settingsRouterConfiguration($stateProvider) {
    $stateProvider.state('settings', {
      abstract: true,
      parent: 'root',
      templateUrl: 'views/template/settings/settings-template-tpl.html',
      url: '/settings'
    });
  }
})(angular);
