(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentState', function documentStateDirective() {
    function postLink(scope, element, attributes, controllers) {

      scope.$watch(attributes.value, function (newValue, oldValue) {
        if (newValue) {
          scope.state = newValue;
        }
      });
    }

    var controller = [
      '$scope', 'DocumentStateApiService',
      function documentStateController($scope, documentStateApiService) {
        var self = this;

      }
    ];

    return {
      restrict: 'EA',
      replace: true,
      terminate: true,
      scope: true,
      templateUrl: 'views/document/state/document-state-directive.tpl.html',
      link: postLink,
      controller: controller
    };

  });

})(window.angular);
