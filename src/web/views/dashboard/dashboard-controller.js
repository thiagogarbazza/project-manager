(function(angular) {
  'use strict';

  angular
    .module('pm')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = [];

  function DashboardController() {
    var vm = this;

    vm.test = 'Dashboard ...';
  }
})(angular);
