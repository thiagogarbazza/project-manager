(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(dashboardRouterConfiguration);

  dashboardRouterConfiguration.$inject = ['$stateProvider'];

  function dashboardRouterConfiguration($stateProvider) {
    $stateProvider.state('dashboard', {
      parent: 'template',
      templateUrl: 'views/dashboard/dashboard-tpl.html',
      url: '/dashboard'
    });
  }
})(angular);
