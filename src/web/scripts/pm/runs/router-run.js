(function() {
  'use strict';

  angular
    .module('pm')
    .run(routerRun);

  routerRun.$inject = ['$rootScope', '$state', '$stateParams'];

  function routerRun($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
})(angular);
