(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentType', function documentTypeDirective() {
    function postLink(scope, element, attributes, controllers) {

      scope.$watch(attributes.value, function (newValue, oldValue) {
        if (newValue) {
          scope.type = newValue;
        }
      });
    }

    var controller = [
      '$scope', 'DocumentTypeApiService',
      function documentTypeController($scope, documentTypeApiService) {
        var self = this;

      }
    ];

    return {
      restrict: 'EA',
      replace: true,
      terminate: true,
      scope: true,
      templateUrl: 'views/document/type/document-type-directive.tpl.html',
      link: postLink,
      controller: controller
    };

  });

})(window.angular);
