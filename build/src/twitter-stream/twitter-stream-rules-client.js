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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterStreamRulesClient = void 0;
const twitter_constants_1 = require("./twitter-constants");
const twitter_client_1 = require("./twitter-client");
const logger_1 = require("../common/logger");
const tsyringe_1 = require("tsyringe");
const auth_1 = require("../auth");
let TwitterStreamRulesClient = class TwitterStreamRulesClient extends twitter_client_1.TwitterClient {
    constructor(keys, logger) {
        super(keys, logger);
        this.keys = keys;
        this.rules = [];
    }
    async getRules() {
        const rules = await this.doClientRequest('GET', twitter_constants_1.TWITTER_STREAM_RULES_URL);
        this.rules = rules ? rules : [];
        return this.rules;
    }
    async addRule(rule) {
        try {
            await this.doClientRequest('POST', twitter_constants_1.TWITTER_STREAM_RULES_URL, {
                add: [rule],
            });
            const rules = await this.getRules();
            this.rules = rules;
        }
        catch (e) {
            const error = e;
            this.logger && this.logger.error(error.message);
            throw e;
        }
    }
    async deleteRule(rule) {
        try {
            await this.doClientRequest('POST', twitter_constants_1.TWITTER_STREAM_RULES_URL, {
                delete: {
                    ids: [rule.id],
                },
            });
            await this.getRules();
        }
        catch (e) {
            const error = e;
            this.logger && this.logger.error(error.message);
            throw error;
        }
    }
    async deleteAllRules() {
        const rules = await this.getRules();
        if (rules.length > 0) {
            await this.doClientRequest('POST', twitter_constants_1.TWITTER_STREAM_RULES_URL, {
                delete: {
                    ids: rules.map(rule => rule.id),
                },
            });
        }
    }
};
TwitterStreamRulesClient = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('TwitterAuth')),
    __param(1, (0, tsyringe_1.inject)('Logger')),
    __metadata("design:paramtypes", [auth_1.TwitterAuth,
        logger_1.Logger])
], TwitterStreamRulesClient);
exports.TwitterStreamRulesClient = TwitterStreamRulesClient;
//# sourceMappingURL=twitter-stream-rules-client.js.map