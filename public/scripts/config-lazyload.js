(function (angular, undefined) {
    'use strict';

    var module = angular.module('app');

    module.config([
        '$ocLazyLoadProvider',
        function ($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: true,
                modules: [
                    {
                        name: 'angularjs-toaster',
                        files: [
                           // 'lib/angularjs-toaster/toaster.min.css', // app.css
                            'libs/angularjs-toaster/toaster.min.js'
                        ]
                    },

                    {
                        name: 'sweetalert',
                        files: [
                            //'lib/sweetalert/toaster.min.css', // app.css
                            'libs/sweetalert/dist/sweetalert.min.js'
                        ]
                    }
                ]
            });
        }
    ]);

})(window.angular);
