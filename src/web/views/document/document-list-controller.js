(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('DocumentListController', DocumentListController);

  DocumentListController.$inject = ['documentApiService'];

  function DocumentListController(documentApiService) {
    var vm = this;

    vm.search = search;

    activate();

    function activate() {
      search();
    }

    function search(parameters) {
      return documentApiService.search(parameters)
        .then(successOnSearch);

      function successOnSearch(response) {
        vm.documents = response.data;
      }
    }
  }
})(angular);
