import 'reflect-metadata';
import {Logger} from '../logger';

describe('Logger', () => {
  it('should be defined', () => {
    expect(Logger).toBeDefined();
  });

  it('should be instantiable', () => {
    expect(new Logger()).toBeInstanceOf(Logger);
  });

  describe('instance', () => {
    let logger: Logger;
    beforeEach(() => {
      logger = new Logger();
    });

    describe('methods', () => {
      it('should have a property _logger', () => {
        expect(logger).toHaveProperty('_logger');
      });

      it('should have a method info', () => {
        expect(logger).toHaveProperty('info');
        expect(logger.info).toBeInstanceOf(Function);
      });
      it('should have a method error', () => {
        expect(logger).toHaveProperty('error');
        expect(logger.error).toBeInstanceOf(Function);
      });
      it('should have a method warn', () => {
        expect(logger).toHaveProperty('warn');
        expect(logger.warn).toBeInstanceOf(Function);
      });
      it('should have a method debug', () => {
        expect(logger).toHaveProperty('debug');
        expect(logger.debug).toBeInstanceOf(Function);
      });
      it('should have a method verbose', () => {
        expect(logger).toHaveProperty('verbose');
        expect(logger.verbose).toBeInstanceOf(Function);
      });
      it('should have a method silly', () => {
        expect(logger).toHaveProperty('silly');
        expect(logger.silly).toBeInstanceOf(Function);
      });
    });
    describe('methods', () => {
      it('.warn', () => {
        const spy = jest.spyOn(logger._logger, 'warn');
        logger.warn('test');
        expect(spy).toHaveBeenCalled();
      });

      it('.error', () => {
        const spy = jest.spyOn(logger._logger, 'error');
        logger.error('error');
        expect(spy).toHaveBeenCalled();
      });

      it('.debug', () => {
        const spy = jest.spyOn(logger._logger, 'debug');
        logger.debug('test');
        expect(spy).toHaveBeenCalled();
      });

      it('.info', () => {
        const spy = jest.spyOn(logger._logger, 'info');
        logger.info('test');
        expect(spy).toHaveBeenCalled();
      });

      it('.verbose', () => {
        const spy = jest.spyOn(logger._logger, 'verbose');
        logger.verbose('test');
        expect(spy).toHaveBeenCalled();
      });

      it('.silly', () => {
        const spy = jest.spyOn(logger._logger, 'silly');
        logger.silly('test');
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
