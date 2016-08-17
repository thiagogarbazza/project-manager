(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(adminDashboardConfiguration);

  adminDashboardConfiguration.$inject = ['$stateProvider'];

  function adminDashboardConfiguration($stateProvider) {
    $stateProvider.state('admin.dashboard', {
      parent: 'admin',
      templateUrl: 'views/dashboard/dashboard-tpl.html',
      url: '/dashboard'
    });
  }
})(angular);
