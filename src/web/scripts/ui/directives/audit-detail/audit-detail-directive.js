(function(angular) {
  'use strict';

  angular
    .module('ui')
    .directive('auditDetail', auditDetailDirective);

  function auditDetailDirective() {
    var directive = {
      link: postLink,
      restrict: 'E',
      templateUrl: 'scripts/ui/directives/audit-detail/audit-detail-tpl.html'
    };

    return directive;

    function postLink($scope, $element, $attributes) {
      $scope.format = 'dd/MM/yyyy \'às\' HH:mm:ss';
      $scope.$watch($attributes.audit, function(newVal) {
        if (newVal) {
          $scope.audit = newVal;
        }
      });
    }
  }
})(angular);
