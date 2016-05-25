(function (angular, undefined) {
    'use strict';

    var module = angular.module('app');

    module.controller('DocumentUpdateController', [
      '$location', '$stateParams',
       function DocumentUpdateController($location, $stateParams) {
         var self = this;
         self.document = {
           id: $stateParams.id,
           code: "COD0000",
           name: "Nome nova história",
           description: "Eu, como <b>Papel</b> quero <b>Objetivo</b> de forma que eu alcance o <b>Benefício</b>.",
           points: 25,
           content: "<h1>Hello World</h1>"
         };

         self.editors= {
           description:{
             options: {
               toolbarInline: true,
               charCounterCount: false,
               toolbarButtons : ["bold", "italic", "underline"]
             }
           },
           content : {
             options: {
               toolbarInline: true,
               charCounterCount: false,
               toolbarButtons : ["bold", "italic", "underline"]
             }
           }
         };


       } // ends controller function
    ]);

})(window.angular);
