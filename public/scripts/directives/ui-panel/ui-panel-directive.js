(function (angular, undefined) {
  'use strict';

  var module = angular.module('ui-panel');

  module.directive('uiPanel', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      template: '<div class="widget" ng-transclude></div>',
      link: postLink,
      controller: controller
    };

    function postLink(scope, element, attributes, controllers) {
    }

    var controller = [
      '$scope',
      function uiPanelController($scope) {

      }
    ];
  });

})(window.angular);
