(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('userService', userService);

  userService.$inject = ['$localStorage'];

  function userService($localStorage) {
    $localStorage.$default({user: {}});

    var service = {
      get: get,
      isAuthenticated: isAuthenticated,
      isAuthorize: isAuthorize,
      register: register,
      signOut: signOut
    };

    return service;

    function get() {
      return $localStorage.user;
    }

    function isAuthenticated() {
      return angular.isDefined($localStorage.user.token);
    }

    function isAuthorize(rule) {
      // TODO: preparar para verificar autorização.
      return angular.isDefined(rule);
    }

    function register(newUser) {
      angular.merge($localStorage.user, newUser);
    }

    function signOut() {
      delete $localStorage.user.token;
    }
  }
})(angular);
