(function(angular) {
  'use strict';

  var PREFIX = 'pm-';

  angular
    .module('pm')
    .config(storageConfiguration);

  storageConfiguration.$inject = ['$localStorageProvider', '$sessionStorageProvider'];

  function storageConfiguration($localStorageProvider, $sessionStorageProvider) {
    $localStorageProvider.setKeyPrefix(PREFIX);
    $sessionStorageProvider.setKeyPrefix(PREFIX);
  }
})(angular);
