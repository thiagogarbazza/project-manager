(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.controller('DocumentCreateController', [
    '$location', '$state', '$stateParams', 'DocumentApiService',
    function DocumentCreateController($location, $state, $stateParams, documentApiService) {
      var self = this;

      function reset() {
        self.document = {
          description: "Eu, como <b>Papel</b> quero <b>Objetivo</b> de forma que eu alcance o <b>Benefício</b>.",
        };
      }

      function comeBack() {
        $state.go('admin.project.document.list');
      }

      function readTemplate(){
        documentApiService.loadTemplate('user-story.tpl', function documentLoadTemplateSuccess(resource) {
          self.document.content = resource.data;
        });
      }

      function readPage(){
        reset();
        readTemplate();
      }

      self.create = function create(projectId, document){
        var documentSave = {
          projectId, projectId,
          code: document.code,
          name: document.name,
          description: document.description,
          points: document.points,
          content: document.content,
          typeId : document.type ? document.type.id: undefined,
          stateId: document.state ? document.state.id: undefined
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

      readPage();

      self.comeBack = comeBack;
    } // ends controller function
  ]);

})(window.angular);
