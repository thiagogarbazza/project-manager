(function(angular) {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = [];

  function DashboardController() {
    var vm = this;

    vm.test = 'Dashboard ...';
  }
})(angular);
