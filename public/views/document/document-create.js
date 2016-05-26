(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.controller('DocumentCreateController', [
    '$location', '$state', '$stateParams', 'DocumentApiService', 'DocumentStatusApiService', 'DocumentTypeApiService',
    function DocumentCreateController($location, $state, $stateParams, documentApiService, documentStatusApiService, documentTypeApiService) {
      var self = this;

      function reset() {
          self.document = {};
      }

      function comeBack() {
          $state.go('admin.document-list');
      }

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

      self.create = function create(document){
        var documentSave = {
          code: document.code,
          name: document.name,
          description: document.description,
          points: document.points,
          content: document.content,
          document_type_id : document.type.id,
          document_status_id: document.status.id
        }

        documentApiService.create(documentSave, function documentCreateSuccess(response){
          if (response.status === 201) {
              alert('Salvo com sucesso');
              reset();
              comeBack();
          } else if(response.status === 409) {
              alert('algum campo esta inválido');
          } else {
             alert('Erro desconhecido.');
          }
        });
      };

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

      self.comeBack = comeBack;
    } // ends controller function
  ]);

})(window.angular);
