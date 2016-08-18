(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(signInConfiguration);

  signInConfiguration.$inject = ['$stateProvider'];

  function signInConfiguration($stateProvider) {
    $stateProvider.state('sign-in', {
      parent: 'root',
      templateUrl: 'views/login/sign-in-tpl.html',
      url: '/sign-in'
    });
  }
})(angular);
