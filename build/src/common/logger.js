"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tsyringe_1 = require("tsyringe");
const winston_1 = require("winston");
let Logger = class Logger {
    constructor() {
        let config = {
            level: 'info',
            format: 'plain',
        };
        const defaultFormat = winston_1.format.combine(winston_1.format.colorize({ all: true }), winston_1.format.timestamp(), winston_1.format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`));
        const defaultConfig = {
            level: 'info',
            format: defaultFormat.toString(),
        };
        config = Object.assign({}, defaultConfig, config);
        const logFormat = config.format === 'json' ? winston_1.format.json() : defaultFormat;
        this._logger = (0, winston_1.createLogger)({
            level: 'info',
            format: logFormat,
            transports: [new winston_1.transports.Console()],
        });
    }
    info(message) {
        this._logger.info(message);
    }
    error(message) {
        this._logger.error(message);
    }
    warn(message) {
        this._logger.warn(message);
    }
    debug(message) {
        this._logger.debug(message);
    }
    verbose(message) {
        this._logger.verbose(message);
    }
    silly(message) {
        this._logger.silly(message);
    }
};
Logger = __decorate([
    (0, tsyringe_1.injectable)(),
    (0, tsyringe_1.singleton)(),
    __metadata("design:paramtypes", [])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map