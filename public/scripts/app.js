(function (angular, undefined) {
    'use strict';

    var module = angular.module('app', [
      'materialAdmin', // TODO: Remover quando remover template
        'ngAnimate',
        'ngCookies',
        //'ngResource', // TODO: Voltar quando remover template
        'ngSanitize',
        'ngTouch',
        // 'ngMaterial',
        'ngStorage',
        //'ui.router', // TODO: Voltar quando remover template
        //'angular-loading-bar', // TODO: Voltar quando remover template
        //'oc.lazyLoad',  // TODO: Voltar quando remover template

    ]);

    module.controller('AppController', [
        '$scope',
        function ($scope) {
            $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (angular.isDefined(toState.pageInfo)) {
                    $scope.pageInfo = toState.pageInfo;
                }
            });

        }
    ]);

    module.config([
      '$localStorageProvider',
      function ($localStorageProvider) {
          $localStorageProvider.setKeyPrefix('pm-');
      }
    ]);

})(window.angular);
