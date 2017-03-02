(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(homeRouterConfiguration);

  homeRouterConfiguration.$inject = ['$stateProvider'];

  function homeRouterConfiguration($stateProvider) {
    $stateProvider.state('home', {
      parent: 'template',
      templateUrl: 'views/dashboard/dashboard-tpl.html',
      url: '/'
    });
  }
})(angular);
