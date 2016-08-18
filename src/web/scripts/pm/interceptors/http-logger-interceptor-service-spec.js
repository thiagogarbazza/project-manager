describe('pm interceptors htto-logger-interceptor', function() {
  'use strict';

  var $log, config, httpLoggerInterceptor;

  beforeEach(module('pm'));

  beforeEach(function() {
    config = {
      method: 'get',
      url: '/service/get/resource'
    };
  });

  describe('description', function() {
    beforeEach(inject(function(_httpLoggerInterceptor_) {
      httpLoggerInterceptor = _httpLoggerInterceptor_;
    }));

    beforeEach(inject(function(_$log_) {
      $log = _$log_;
    }));

    it('Deve ter uma instancia de "HTTPLoggerInterceptor" definida.', function() {
      expect(httpLoggerInterceptor).toBeDefined();
    });

    it('Deve conter as informações de log.', function() {
      httpLoggerInterceptor.request(config);
      expect($log.debug.logs[0]).toEqual(['get', '->', '/service/get/resource']);
    });
  });

  describe('Se o Log em debugging estiver desabilitado', function() {

    beforeEach(module(function($logProvider) {
      // We can configure the debugging level (the default is true)
      $logProvider.debugEnabled(false);
    }));

    beforeEach(inject(function(_httpLoggerInterceptor_) {
      httpLoggerInterceptor = _httpLoggerInterceptor_;
    }));

    beforeEach(inject(function(_$log_) {
      $log = _$log_;
    }));

    it('Não deve colocar nada no log quando o modo debug estiver desligado.', function() {
      httpLoggerInterceptor.request(config);
      expect($log.assertEmpty).not.toThrow();
    });
  });

});
