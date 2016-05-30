(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentTypeSelect', function documentTypeSelectDirective() {
    function documentTypeSelectPostLink(scope, element, attributes, controllers) {
      var ngModelController = controllers[0];
      
      scope.$watch(attributes.ngModel, function (newValue, oldValue) {
        if (newValue) {
          scope.selected = newValue;
        }
      });

      scope.$watch('selected', function (newValue, oldValue) {
        if (angular.isArray(newValue) && newValue.length == 0) {
          newValue = undefined;
        }
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
          $scope.selected = undefined;
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
      templateUrl: 'views/document/type/document-type-select.tpl.html',
      link: documentTypeSelectPostLink,
      controller: controller
    };

  });

  module.controller('DocumentTypeSelectController', );

})(window.angular);
