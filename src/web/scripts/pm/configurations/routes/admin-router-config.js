(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(adminConfiguration);

  adminConfiguration.$inject = ['$stateProvider'];

  function adminConfiguration($stateProvider) {
    $stateProvider.state('admin', {
      abstract: true,
      parent: 'root',
      templateUrl: 'views/template/admin/admin-template-tpl.html'
    });
  }
})(angular);
