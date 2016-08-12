(function(angular) {
  'use strict';

  angular
    .module('pm')
    .constant('settings', {
      API: {
        URL: '/service/'
      }
    });
})(angular);
