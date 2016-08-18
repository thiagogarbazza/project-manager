(function(angular) {
  'use strict';

  angular
    .module('pm')
    .factory('userService', userService);

  userService.$inject = ['$sessionStorage'];

  function userService($sessionStorage) {
    $sessionStorage.$default({
      user: {}
    });

    var service = {
      get: get,
      isAuthenticated: isAuthenticated,
      isAuthorize: isAuthorize,
      register: register,
      signOut: signOut
    };

    return service;

    function get() {
      return $sessionStorage.user;
    }

    function isAuthenticated() {
      return angular.isDefined($sessionStorage.user.token);
    }

    function isAuthorize(rule) {
      // TODO: preparar para verificar autorização.
      return angular.isDefined(rule);
    }

    function register(newUser) {
      angular.merge($sessionStorage.user, newUser);
    }

    function signOut() {
      delete $sessionStorage.user.token;
    }
  }
})(angular);
