(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.controller('ProjectDashboardController', [
    '$location', '$stateParams', 'ProjectApiService',
    function ProjectDashboardController($location, $stateParams, projectApiService) {
      var self = this;

      function loading(code) {
        projectApiService.findByCode(code, function projectReadSuccess(response){
          self.project = response.data[0];
        });

      }

      loading($stateParams.code);

    } // ends controller function
  ]);

})(window.angular);
