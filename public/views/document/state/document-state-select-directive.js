(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentStateSelect', function documentStateSelectDirective() {
    function postLink(scope, element, attributes, controllers) {
      var ngModelController = controllers[0];

      scope.$watch(attributes.ngModel, function (newValue, oldValue) {
        scope.itemSelected = newValue;
      });

      scope.$watch('itemSelected', function (newValue, oldValue) {
        ngModelController.$setViewValue(newValue);
      });

      scope.loadingItens();
    }

    var controller = [
      '$scope', 'DocumentStateApiService',
      function documentStateSelectController($scope, documentStateApiService) {
        var self = this;

        function reset() {
          $scope.itens = [];
          $scope.itemSelected = undefined;
        }

        function loadingItens() {
          reset();
          $scope.loading = true;
          documentStateApiService.search({}, function documentStateSearchSuccess(resource) {
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
      templateUrl: 'views/document/state/document-state-select-directive.tpl.html',
      link: postLink,
      controller: controller
    };

  });

})(window.angular);
