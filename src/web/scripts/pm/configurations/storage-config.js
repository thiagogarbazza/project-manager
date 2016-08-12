(function(angular) {
  'use strict';

  var PREFIX = 'pm-';

  angular
    .module('pm')
    .config(StorageConfiguration);

  StorageConfiguration.$inject = ['$localStorageProvider', '$sessionStorageProvider'];

  function StorageConfiguration($localStorageProvider, $sessionStorageProvider) {
    $localStorageProvider.setKeyPrefix(PREFIX);
    $sessionStorageProvider.setKeyPrefix(PREFIX);
  }
})(angular);
