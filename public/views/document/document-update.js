(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.controller('DocumentUpdateController', [
    '$location', '$state', '$stateParams', 'DocumentApiService',
    function DocumentUpdateController($location, $state, $stateParams, documentApiService) {
      var self = this;

      function reset() {
          self.document = {};
      }

      function comeBack() {
        $state.go('admin.project.document.list');
      }

      function readDocument(id){
        documentApiService.detail(id, function documentReadSuccess(response){
          self.document = response.data;
          self.document.type = {id: self.document.typeId};
          self.document.state = {id: self.document.stateId};
        });
      }

      function readPage(){
        readDocument($stateParams.id);
      }

      self.save = function save(document){
        var documentSave = {
          code: document.code,
          name: document.name,
          description: document.description,
          points: document.points,
          content: document.content
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
