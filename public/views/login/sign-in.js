(function (angular) {
  'use strict';

  var module = angular.module('app');

  module.controller('SignInController', [
    '$localStorage', '$state', 'TokenApiService',
    function SignInController($localStorage, $state,  tokenApiService) {
      var self = this;
      var userStorage = $localStorage.$default({user: {}}).user;

      self.signIn = function(user){
        tokenApiService.generate(user, function tokenGenerateSuccess(resource) {
          angular.merge(userStorage, resource.data);
          $state.go('admin.dashboard');
        });
      }
    }
  ]);
})(window.angular);
