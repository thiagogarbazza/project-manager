(function (angular, undefined) {
  'use strict';

  var module = angular.module('app');

  module.controller('DocumentListController', [
    '$location', '$stateParams', 'DocumentApiService',
    function DocumentListController($location, $stateParams, documentApiService) {
      var self = this;
      function readDocuments(){
        documentApiService.search({}, function documentSearchSuccess(resource){
          self.documents = resource.data;
        })
      }

      function readPage(){
        readDocuments();
      }


      readPage();

    } // ends controller function
  ]);

})(window.angular);
