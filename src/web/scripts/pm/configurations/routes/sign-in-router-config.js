(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(signInRouterConfiguration);

  signInRouterConfiguration.$inject = ['$stateProvider'];

  function signInRouterConfiguration($stateProvider) {
    $stateProvider.state('sign-in', {
      parent: 'root',
      templateUrl: 'views/sign-in/sign-in-tpl.html',
      url: '/sign-in'
    });
  }
})(angular);
