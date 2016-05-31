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
                    'views/template/header.js',
                    'views/template/navbar.js',
                    'libs/angular-ui-select/dist/select.min.js',
                    'libs/angular-ui-select/dist/select.min.css',
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

      .state('admin.project', {
        parent: 'admin',
        url: '/project/{code}',
        template: '<ui-view></ui-view>',
        controller: ['$scope', '$stateParams', 'ProjectApiService', function ($scope, $stateParams, projectApiService){
          function loading(code) {
            projectApiService.findByCode(code, function projectReadSuccess(response){
              $scope.project = response.data[0];
            });
          }
          loading($stateParams.code);
        }],
        resolve: {
          dependency: [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                files: [
                  'scripts/service/api/project-api-service.js'
                ],
                serie: true
              });
            }
          ]
        }
      })

      .state('admin.project.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/project/project-dashboard.tpl.html',
        resolve: {
          dependency: [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                files: [
                  'views/project/project-dashboard.js'
                ],
                serie: true
              });
            }
          ]
        }
      })

      .state('admin.project.document', {
        url: '/document',
        template: '<ui-view></ui-view>',
        resolve: {
          dependency: [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                files: [
                  'scripts/service/api/document-api-service.js',
                ],
                serie: true
              });
            }
          ]
        }
      })

      .state('admin.project.document.list', {
        url: '/',
        templateUrl: 'views/document/document-list.tpl.html',
        pageInfo: {
          head: {
            title: 'document',
            description: 'Update document',
            code: ''
          }
        },
        resolve: {
          dependency: [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
              return $ocLazyLoad.load({
                files: [
                  'views/document/document-list.js'
                ],
                serie: true
              });
            }
          ]
        }
      })

      .state('admin.project.document.create', {
        url: '/create',
        templateUrl: 'views/document/document-create.tpl.html',
        pageInfo: {
          head: {
            title: 'document',
            description: 'Update document',
            code: ''
          }
        },
        resolve: {
          dependency: [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
              return $ocLazyLoad.load(['angular-summernote', 'directives']).then(function () {
                return $ocLazyLoad.load({
                  files: [
                    'scripts/service/api/document-state-api-service.js',
                    'views/document/document-create.js'
                  ],
                  serie: true
                });
              });
            }
          ]
        }
      })

      .state('admin.project.document.update', {
        url: '/{id}/update',
        templateUrl: 'views/document/document-update.tpl.html',
        pageInfo: {
          head: {
            title: 'document',
            description: 'Update document',
            code: ''
          }
        },
        resolve: {
          dependency: [
            '$ocLazyLoad',
            function ($ocLazyLoad) {
              return $ocLazyLoad.load(['angular-summernote', 'directives']).then(function () {
                return $ocLazyLoad.load({
                  files: [
                    'scripts/service/api/document-state-api-service.js',
                    'views/document/document-update.js'
                  ],
                  serie: true
                });
              });
            }
          ]
        }
      })


      ;
    }
  ]);
})(window.angular);
