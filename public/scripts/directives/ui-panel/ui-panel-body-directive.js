(function (angular, undefined) {
  'use strict';

  var module = angular.module('ui-panel');

  module.directive('uiPanelBody', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      require: "^?uiPanel",
      template: '<div class="widget-body" ng-transclude></div>',
      link: postLink,
      controller: controller
    };

    function postLink(scope, element, attributes, controllers) {
    }

    var controller = [
      '$scope',
      function uiPanelBodyController($scope) {

      }
    ];
  });

})(window.angular);
