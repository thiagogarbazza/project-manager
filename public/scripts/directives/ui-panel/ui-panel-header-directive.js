(function (angular, undefined) {
  'use strict';

  var module = angular.module('ui-panel');

  module.directive('uiPanelHeader', function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      template: '<div class="widget-header"></div>',
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
      restrict: 'EA',
      replace: true,
      scope: true,
      template: '<span class="widget-caption"></span>',
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
      restrict: 'EA',
      replace: true,
      scope: true,
      template: '<div class="widget-buttons"></div>',
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
