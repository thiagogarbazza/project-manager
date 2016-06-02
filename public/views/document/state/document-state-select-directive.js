(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentStateSelect', function documentStateSelectDirective() {
    function postLink(scope, element, attributes, controllers) {

    }

    var controller = [
      '$scope', 'DocumentStateApiService',
      function documentStateSelectController($scope, documentStateApiService) {
        var self = this;

        function reset() {
          $scope.itens = [];
        }

        function loadingItens() {
          reset();
          $scope.loading = true;
          documentStateApiService.search({}, function documentStateSearchSuccess(resource) {
            $scope.loading = false;
            $scope.items = resource.data;
            $scope.noResults = angular.isArray($scope.items) && $scope.items.length == 0;
          });
        }

        loadingItens();
      }
    ];

    return {
      restrict: 'E',
      scope: {
        itemSelected: '=item'
      },
      templateUrl: 'views/document/state/document-state-select-directive.tpl.html',
      link: postLink,
      controller: controller
    };

  });

})(window.angular);
