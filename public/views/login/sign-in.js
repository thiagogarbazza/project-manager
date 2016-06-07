(function (angular) {
  'use strict';

  var module = angular.module('app');

  module.controller('SignInController', [
    '$localStorage', 'TokenApiService',
    function SignInController($localStorage, tokenApiService) {
      var self = this;
      var userStorage = $localStorage.$default({user: {}}).user;

      self.signIn = function(user){
        tokenApiService.generate(user, function tokenGenerateSuccess(resource) {
          angular.merge(userStorage, resource.data);
        });
      }
    }
  ]);
})(window.angular);
