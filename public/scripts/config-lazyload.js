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
                    },
                    {
                        name: 'angular-summernote',
                        files: [
                            'libs/summernote/dist/summernote.min.js',
                            'libs/summernote/dist/summernote.css',
                            'libs/angular-summernote/dist/angular-summernote.min.js',
                        ]
                    },
                    {
                        name: 'directives',
                        serie: true,
                        files: [
                            'scripts/service/api/document-type-api-service.js',
                            'views/document/type/document-type-directive.js',
                            'views/document/type/document-type-select-directive.js',

                            'scripts/service/api/document-state-api-service.js',
                            'views/document/state/document-state-directive.js',
                            'views/document/state/document-state-select-directive.js',
                        ]
                    }
                ]
            });
        }
    ]);

})(window.angular);
