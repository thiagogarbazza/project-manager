(function (angular, undefined) {
    'use strict';

    var module = angular.module('app');

    module.constant('config', {
        serviceAPI: {
          url:'http://localhost:3000/'
        }
    });

    module.value('settings', {});

})(window.angular);
