(function(angular) {
  'use strict';

  angular
    .module('pm')
    .config(rootConfiguration);

  rootConfiguration.$inject = ['$stateProvider'];

  function rootConfiguration($stateProvider) {
    $stateProvider.state('root', {
      abstract: true,
      template: '<div ui-view></div>'
    });
  }
})(angular);
