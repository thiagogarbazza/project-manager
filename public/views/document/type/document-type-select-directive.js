(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentTypeSelect', function documentTypeSelectDirective() {
    function postLink(scope, element, attributes, controllers) {
      var ngModelController = controllers[0];

      scope.$watch(attributes.ngModel, function (newValue, oldValue) {
        console.log('attr w', newValue);
        scope.itemSelected = newValue;
      });

      scope.$watch('itemSelected', function (newValue, oldValue) {
        console.log('scope w', newValue);
        ngModelController.$setViewValue(newValue);
      });

      scope.loadingItens();
    }

    var controller = [
      '$scope', 'DocumentTypeApiService',
      function documentTypeSelectController($scope, documentTypeApiService) {
        var self = this;

        function reset() {
          $scope.itens = [];
          $scope.itemSelected = undefined;
        }

        function loadingItens() {
          reset();
          $scope.loading = true;
          documentTypeApiService.search({}, function documentTypeSearchSuccess(resource) {
            $scope.loading = false;
            $scope.itens = resource.data;
            $scope.noResults = angular.isArray($scope.itens) && $scope.itens.length == 0;
          });
        }

        $scope.loadingItens = loadingItens;
      }
    ];

    return {
      restrict: 'EA',
      replace: true,
      terminate: true,
      scope: true,
      require: ['ngModel'],
      templateUrl: 'views/document/type/document-type-select-directive.tpl.html',
      link: postLink,
      controller: controller
    };

  });

})(window.angular);
