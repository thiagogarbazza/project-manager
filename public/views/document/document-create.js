(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.controller('DocumentCreateController', [
    '$location', '$stateParams', 'DocumentApiService', 'DocumentStatusApiService', 'DocumentTypeApiService',
    function DocumentCreateController($location, $stateParams, documentApiService, documentStatusApiService, documentTypeApiService) {
      var self = this;

      function readStatus(){
        documentStatusApiService.search({}, function documentStatusSearchSuccess(resource) {
          self.status = resource.data;
        });
      }

      function readTypes(){
        documentTypeApiService.search({}, function documentTypeSearchSuccess(resource) {
          self.types = resource.data;
        });
      }

      function readPage(){
        readStatus();
        readTypes();
      }

      self.document = {
        id: $stateParams.id,
        code: "COD0000",
        name: "Nome nova história",
        description: "Eu, como <b>Papel</b> quero <b>Objetivo</b> de forma que eu alcance o <b>Benefício</b>.",
        points: 25,
        content: "<h1>Hello World</h1>",
        type :{ id: '0a2f796d-c57d-4060-8401-179b7bc3f580'},
        status :{ id: '8a720621-2804-47fa-84bd-77af966f29ca'}
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

      readPage();

    } // ends controller function
  ]);

})(window.angular);
