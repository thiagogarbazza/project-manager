(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('ClientListController', ClientListController);

  ClientListController.$inject = ['clientApiService'];

  function ClientListController(clientApiService) {
    var vm = this;

    vm.search = search;

    activate();

    function activate() {
      search();
    }

    function search(parameters) {
      return clientApiService.search(parameters)
        .then(successOnSearch);

      function successOnSearch(response) {
        vm.clients = response.data;
      }
    }
  }
})(angular);
