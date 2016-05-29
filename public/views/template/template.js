(function (angular, undefined) {
    'use strict';

    var module = angular.module('app');

    module.controller('TemplateController', [
       function TemplateController() {
         var self = this;


         self.settings = {
           fixed: {
             breadcrumbs: false
           }
         };

       } // ends controller function
    ]);

})(window.angular);
