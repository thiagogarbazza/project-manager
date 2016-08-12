(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(routerConfiguration);

  routerConfiguration.$inject = ['$urlRouterProvider'];

  function routerConfiguration($urlRouterProvider) {
    $urlRouterProvider.when('', tratadorDeURLVazia);
    $urlRouterProvider.otherwise('/404');
  }

  tratadorDeURLVazia.$inject = ['userService'];

  function tratadorDeURLVazia(userService) {
    if (userService.isAuthenticated()) {
      return '/dashboard';
    }
    return '/sign-in';
  }
})(angular);
