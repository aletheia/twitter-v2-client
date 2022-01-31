import {injectable, singleton} from 'tsyringe';
import {createLogger, format, Logger as WLogger, transports} from 'winston';

export interface LoggerConfig {
  level?: string;
  format?: string;
}

@injectable()
@singleton()
export class Logger {
  public _logger: WLogger;

  constructor() {
    let config = {
      level: 'info',
      format: 'plain',
    };

    const defaultFormat = format.combine(
      format.colorize({all: true}),
      format.timestamp(),
      format.printf(
        info => `${info.timestamp} [${info.level}]: ${info.message}`
      )
    );

    const defaultConfig: LoggerConfig = {
      level: 'info',
      format: defaultFormat.toString(),
    };
    config = Object.assign({}, defaultConfig, config);
    const logFormat = config.format === 'json' ? format.json() : defaultFormat;
    this._logger = createLogger({
      level: 'info',
      format: logFormat,
      transports: [new transports.Console()],
    });
  }

  info(message: string) {
    this._logger.info(message);
  }

  error(message: string) {
    this._logger.error(message);
  }

  warn(message: string) {
    this._logger.warn(message);
  }

  debug(message: string) {
    this._logger.debug(message);
  }

  verbose(message: string) {
    this._logger.verbose(message);
  }

  silly(message: string) {
    this._logger.silly(message);
  }
}
