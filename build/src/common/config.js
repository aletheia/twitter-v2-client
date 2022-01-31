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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const nconf_1 = __importDefault(require("nconf"));
const dotenv_1 = __importDefault(require("dotenv"));
const tsyringe_1 = require("tsyringe");
let Config = class Config {
    constructor() {
        dotenv_1.default.config();
        nconf_1.default.env();
    }
    get(key) {
        const value = nconf_1.default.get(key);
        if (value === undefined) {
            throw new Error(`Config key ${key} not found`);
        }
        return value;
    }
};
Config = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], Config);
exports.Config = Config;
//# sourceMappingURL=config.js.map