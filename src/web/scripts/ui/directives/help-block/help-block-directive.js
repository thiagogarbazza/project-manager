(function(angular) {
  'use strict';

  angular
    .module('ui')
    .directive('helpBlock', helpBlockDirective);

  helpBlockDirective.$inject = [];

  function helpBlockDirective() {
    var directive = {
      compile: compiler,
      require: '^form',
      restrict: 'A'
    };

    return directive;

    function compiler() {
      return {
        post: postLink,
        pre: preLink
      };
    }

    function postLink($scope, $element, $attributes, formController) {
      var input = angular.element($element.parent().find('[name][ng-model]'));

      $scope.$watch(formController.$name + '.' + input.attr('name') + '.$dirty', toogleClass);
      $scope.$watch(formController.$name + '.' + input.attr('name') + '.$touched', toogleClass);
      $scope.$watch(formController.$name + '.' + input.attr('name') + '.$invalid', toogleClass);

      function toogleClass() {
        var inputController = formController[input.attr('name')];

        var dirty = inputController && inputController.$dirty;
        var invalid = inputController && inputController.$invalid;
        var touched = inputController && inputController.$touched;

        var show = invalid && (touched || dirty);
        if (show) {
          $element.removeClass('ng-hide');
        } else {
          $element.addClass('ng-hide');
        }
      }
    }

    function preLink($scope, $element, $attributes, formController) {
      if (!formController || !formController.$name) {
        throw new Error('help-block deve possuir um "parent" form com o atributo "name".');
      }

      $element.addClass('help-block');
      $element.attr('role', 'alert');
    }
  }
})(angular);
