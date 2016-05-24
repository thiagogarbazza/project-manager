(function (angular, undefined) {
    'use strict';

    var module = angular.module('app');

    module.controller('TemplateController', [
       function TemplateController() {
         var self = this;
         // By default Sidbars are hidden in boxed layout and in wide layout only the right sidebar is hidden.
        self.sidebarToggle = {
            left: false,
            right: false
        }
       }
    ]);

})(window.angular);
