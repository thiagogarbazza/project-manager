(function(angular, HttpStatus) {
  'use strict';

  angular
    .module('pm')
    .controller('SignInController', SignInController);

  SignInController.$inject = ['$state', 'tokenApiService', 'userService'];

  function SignInController($state, tokenApiService, userService) {
    var vm = this;
    vm.signIn = signIn;

    function signIn(user) {
      vm.showMessageError = false;
      tokenApiService
        .generate(user)
        .then(successOnGenerateToken)
        .catch(errorOnGenerateToken);

      function successOnGenerateToken(response) {
        userService.register(response.data);
        $state.go('admin.dashboard');
      }

      function errorOnGenerateToken(response) {
        if (response === HttpStatus.UNAUTHORIZED) {
          vm.showMessageError = true;
        }
      }
    }
  }
})(angular, httpStatusCode);
