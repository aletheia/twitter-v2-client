import { Logger as WLogger } from 'winston';
export interface LoggerConfig {
    level?: string;
    format?: string;
}
export declare class Logger {
    protected _logger: WLogger;
    constructor();
    info(message: string): void;
    error(message: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
    silly(message: string): void;
}
