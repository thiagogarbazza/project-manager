(function(angular) {
  'use strict';

  angular
    .module('ui')
    .directive('hasError', hasErrorDirective);

  hasErrorDirective.$inject = [];

  function hasErrorDirective() {
    var directive = {
      compile: compiler,
      require: '^form',
      restrict: 'A'
    };

    return directive;

    function compiler(tElement) {
      if (!(tElement.hasClass('form-group') || tElement.hasClass('input-group'))) {
        throw new Error('has-error deve possuir a CSS class "form-group" ou "input-group".');
      }

      return {
        post: postLink,
        pre: preLink
      };
    }

    function postLink($scope, $element, $attributes, formController) {
      var input = angular.element($element.find('[name][ng-model]'));

      $scope.$watch(formController.$name + '.' + input.attr('name') + '.$dirty', toogleClass);
      $scope.$watch(formController.$name + '.' + input.attr('name') + '.$touched', toogleClass);
      $scope.$watch(formController.$name + '.' + input.attr('name') + '.$invalid', toogleClass);

      function toogleClass() {
        var inputController = formController[input.attr('name')];

        var visible = inputController && (inputController.$touched || inputController.$dirty);
        var invalid = inputController && inputController.$invalid;
        if (visible && invalid) {
          $element.addClass('has-error');
        } else {
          $element.removeClass('has-error');
        }
      }
    }

    function preLink($scope, $element, $attributes, formController) {
      if (!formController || !formController.$name) {
        throw new Error('has-error deve possuir um "parent" form com o atributo "name".');
      }
    }
  }
})(angular);
