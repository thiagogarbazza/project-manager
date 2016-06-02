(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentType', function documentTypeDirective() {
    function postLink(scope, element, attributes, controllers) {
      scope.$watch('value', function(newValue, oldValue){
        scope.loadingType(newValue);
      });
    }

    var controller = [
      '$scope', 'DocumentTypeApiService',
      function documentTypeController($scope, documentTypeApiService) {
        $scope.loadingType = function loadingType(type) {
          if(type && !type.name){
            documentTypeApiService.detail(type.id, function detailTypeSuccess(resource){
              $scope.value = resource.data;
            });
          }
        }
      }
    ];

    return {
      restrict: 'E',
      replace: true,
      scope:  {
        value: '='
      },
      templateUrl: 'views/document/type/document-type-directive.tpl.html',
      link: postLink,
      controller: controller
    };

  });

})(window.angular);
