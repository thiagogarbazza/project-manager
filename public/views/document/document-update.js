(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.controller('DocumentUpdateController', [
    '$location', '$state', '$stateParams', 'DocumentApiService', 'DocumentStatusApiService', 'DocumentTypeApiService',
    function DocumentUpdateController($location, $state, $stateParams, documentApiService, documentStatusApiService, documentTypeApiService) {
      var self = this;

      function reset() {
          self.document = {};
      }

      function comeBack() {
        console.log('PASSEI ALQUI...');
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

      function readDocument(id){
        documentApiService.detail(id, function documentReadSuccess(response){
          self.document = response.data;
        });
      }

      function readPage(){
        readStatus();
        readTypes();
        readDocument($stateParams.id);
      }

      self.save = function save(document){
        var documentSave = {
          code: document.code,
          name: document.name,
          description: document.description,
          points: document.points,
          content: document.content,
          document_type_id : document.type.id,
          document_status_id: document.status.id
        }

        documentApiService.update($stateParams.id, documentSave, function documentSaveSuccess(response){
          if (response.status === 204) {
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

      self.comeBack = comeBack;
      readPage();
    } // ends controller function
  ]);

})(window.angular);
