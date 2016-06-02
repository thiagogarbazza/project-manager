(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.directive('documentState', function documentStateDirective() {
    function postLink(scope, element, attributes, controllers) {
      scope.$watch('value', function(newValue, oldValue){
        scope.loadingState(newValue);
      });
    }

    var controller = [
      '$scope', 'DocumentStateApiService',
      function documentStateController($scope, documentStateApiService) {
        $scope.loadingState = function loadingState(state) {
          if(state && !state.name){
            documentStateApiService.detail(state.id, function detailStateSuccess(resource){
              $scope.value = resource.data;
            });
          }
        }

      }
    ];

    return {
      restrict: 'E',
      replace: true,
      scope: {
        value: '='
      },
      templateUrl: 'views/document/state/document-state-directive.tpl.html',
      link: postLink,
      controller: controller
    };

  });

})(window.angular);
