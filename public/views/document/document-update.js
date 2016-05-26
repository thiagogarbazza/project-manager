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
          self.document.type = self.types.find(function byId(element) {
            return element.id == self.document.document_type_id;
          });
          self.document.status = self.status.find(function byId(element) {
            return element.id == self.document.document_status_id;
          });
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
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
              ]
          }
        },
        content : {
          options: {
            airMode: true,
            toolbar: [
              ['edit',['undo','redo']],
              ['headline', ['style']],
              ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
              ['fontface', ['fontname']],
              ['textsize', ['fontsize']],
              ['fontclr', ['color']],
              ['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
              ['height', ['height']],
              ['table', ['table']],
              ['insert', ['link','picture','video','hr']],
              ['view', ['fullscreen', 'codeview']],
              ['help', ['help']]
            ]
          }
        }
      };

      self.comeBack = comeBack;
      readPage();
    } // ends controller function
  ]);

})(window.angular);
