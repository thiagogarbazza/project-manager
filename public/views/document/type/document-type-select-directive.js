(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentTypeSelect', function documentTypeSelectDirective() {
    function postLink(scope, element, attributes, ngModelController) {

    }

    var controller = [
      '$scope', 'DocumentTypeApiService',
      function documentTypeSelectController($scope, documentTypeApiService) {
        function reset() {
          $scope.itens = [];
        }

        function loadingItens() {
          reset();
          $scope.loading = true;
          documentTypeApiService.search({}, function documentTypeSearchSuccess(resource) {
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
      templateUrl: 'views/document/type/document-type-select-directive.tpl.html',
      link: postLink,
      controller: controller
    };
  });

})(window.angular);
