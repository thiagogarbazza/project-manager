(function (angular, undefined) {
  'use strict';

  var module = angular.module('ui-panel');

  module.directive('uiPanel', function () {
    return {
      restrict: 'EA',
      replace: true,
      scope: true,
      template: '<div class="widget"></div>',
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
