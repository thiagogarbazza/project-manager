(function (angular, undefined) {
    'use strict';

    var module = angular.module('app');

    module.run([
        '$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    ]);

    module.config([
        '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.when('', '/dashboard');
            $urlRouterProvider.otherwise('/404');

            $stateProvider
                .state('root', {
                    abstract: true,
                    template: '<div ui-view></div>'
                })

                .state('admin', {
                    parent: 'root',
                    abstract: true,
                    templateUrl: 'views/template/template.tpl.html',
                    resolve: {
                        dependency: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                              return $ocLazyLoad.load(['angularjs-toaster', 'sweetalert']).then(function () {
                                    return $ocLazyLoad.load({
                                        files: [
                                            'views/template/template.js',
                                            'views/template/header.js'
                                        ],
                                        serie: true
                                    });
                                });
                            }
                        ]
                    }
                })

                .state('admin.dashboard', {
                    parent: 'admin',
                    url: '/dashboard',
                    templateUrl: 'views/dashboard/dashboard.tpl.html',
                    pageInfo: {
                        head: {
                            title: 'Dashboard',
                            description: 'Dashboard for application',
                            code: '2545565'
                        }
                    },
                    resolve: {
                        dependency: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                              return $ocLazyLoad.load({
                                  files: [
                                      'views/dashboard/dashboard.js'
                                  ],
                                  serie: true
                              });
                            }
                        ]
                    }
                })

                .state('admin.project-list', {
                    parent: 'admin',
                    url: '/project',
                    templateUrl: 'views/project/project-list.tpl.html',
                    pageInfo: {
                        head: {
                            title: 'Project',
                            description: 'List project',
                            code: ''
                        }
                    },
                    resolve: {
                        dependency: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                              return $ocLazyLoad.load({
                                  files: [
                                      'scripts/service/api/project-api-service.js',
                                      'views/project/project-list.js'
                                  ],
                                  serie: true
                              });
                            }
                        ]
                    }
                })


            ;
        }
    ]);
})(window.angular);
