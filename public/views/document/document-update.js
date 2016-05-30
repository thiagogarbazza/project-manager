(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.controller('DocumentUpdateController', [
    '$location', '$state', '$stateParams', 'DocumentApiService', 'DocumentStateApiService', 'DocumentTypeApiService',
    function DocumentUpdateController($location, $state, $stateParams, documentApiService, documentStateApiService, documentTypeApiService) {
      var self = this;

      function reset() {
          self.document = {};
      }

      function comeBack() {
        $state.go('admin.project.document.list');
      }

      function readStatus(){
        documentStateApiService.search({}, function documentStateSearchSuccess(resource) {
          self.states = resource.data;
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
            return element.id == self.document.typeId;
          });
          self.document.state = self.states.find(function byId(element) {
            return element.id == self.document.stateId;
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
          typeId : document.type.id,
          stateId: document.state.id
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
            airMode: true,
            toolbar: [
                ['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
              ]
          }
        },
        content : {
          options: {
            airMode: false,
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
