(function (angular, undefined) {
    'use strict';

    var module = angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.router',
        'angular-loading-bar',
        'oc.lazyLoad',

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
