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
                        name: 'angular-froala',
                        files: [
                            //'lib/sweetalert/toaster.min.css', // app.css
                            'libs/froala-wysiwyg-editor/js/froala_editor.min.js',
                            'libs/angular-froala/src/angular-froala.js',
                            'libs/angular-froala/src/froala-sanitize.js',
                            'libs/froala-wysiwyg-editor/css/froala_editor.min.css',
                            'libs/froala-wysiwyg-editor/css/froala_style.min.css'
                        ]
                    }
                ]
            });
        }
    ]);

})(window.angular);
