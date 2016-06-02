(function (angular, undefined) {
  'use strict';

  var module = angular.module('ui-panel');

  module.directive('uiPanelHeader', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      require: "^?uiPanel",
      template: '<div class="widget-header" ng-transclude></div>',
      link: postLink,
      controller: controller
    };

    function postLink(scope, element, attributes, controllers) {
    }

    var controller = [
      '$scope',
      function uiPanelHeaderController($scope) {

      }
    ];
  });

  module.directive('uiPanelHeaderCaption', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      require: "^?uiPanelHeader",
      template: '<span class="widget-caption" ng-transclude></span>',
      link: postLink,
      controller: controller
    };

    function postLink(scope, element, attributes, controllers) {
    }

    var controller = [
      '$scope',
      function uiPanelHeaderCaptionController($scope) {

      }
    ];
  });

  module.directive('uiPanelHeaderButtons', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {},
      require: "^?uiPanelHeader",
      template: '<div class="widget-buttons" ng-transclude></div>',
      link: postLink,
      controller: controller
    };

    function postLink(scope, element, attributes, controllers) {
    }

    var controller = [
      '$scope',
      function uiPanelHeaderButtonsController($scope) {

      }
    ];
  });

})(window.angular);
