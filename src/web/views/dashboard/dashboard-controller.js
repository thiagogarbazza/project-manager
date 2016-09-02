(function(angular) {
  'use strict';

  angular
    .module('pm')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['toaster'];

  function DashboardController(toaster) {
    var vm = this;

    vm.test = 'Dashboard ...';

    vm.showNotification = showNotification;

    function showNotification() {
      toaster.pop({
        'body': 'Body text',
        'position-class': 'toast-top-full-width',
        'icon-classes': 'toast-orange',
        'timeout': 3000,
        'title': 'Title text'
      });
    }
  }
})(angular);
