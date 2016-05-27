(function (angular, undefined) {
    'use strict';

    var module = angular.module('app');

    module.constant('config', {
        serviceAPI: {
          url:'/'
        }
    });

    module.value('settings', {});

})(window.angular);
