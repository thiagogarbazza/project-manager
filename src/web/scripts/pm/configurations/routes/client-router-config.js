(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(clientRouterConfiguration);

  clientRouterConfiguration.$inject = ['$stateProvider'];

  function clientRouterConfiguration($stateProvider) {
    $stateProvider.state('client', {
      parent: 'template',
      templateUrl: 'views/client/client-list-tpl.html',
      url: '/client'
    });
  }
})(angular);
