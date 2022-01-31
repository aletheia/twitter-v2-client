"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterClient = void 0;
const axios_1 = __importDefault(require("axios"));
const twitter_response_1 = require("../interfaces/twitter-response");
class TwitterClient {
    constructor(keys, logger) {
        this.keys = keys;
        this.logger = logger;
        this.logger = logger;
        this.keys = keys;
        axios_1.default.defaults.headers.common['Authorization'] = `Bearer ${this.keys.bearerToken}`;
    }
    clientHeaders() {
        return {
            'content-type': 'application/json',
            authorization: `Bearer ${this.keys.bearerToken}`,
        };
    }
    async client(config) {
        const defaultConfig = {
            timeout: 30000,
            responseType: 'json',
            method: 'GET',
        };
        config = Object.assign({}, defaultConfig, config);
        const { url, method, data, responseType, timeout } = config;
        return (0, axios_1.default)({
            url,
            method,
            data,
            responseType,
            timeout,
            headers: this.clientHeaders(),
            validateStatus: status => status < 400,
        });
    }
    async doClientRequest(method, url, data) {
        try {
            const response = await this.client({ url, method, data });
            const payload = response.data;
            const twitterResponse = twitter_response_1.TwitterResponse.fromJson(payload);
            return twitterResponse.unwrap();
        }
        catch (e) {
            const error = e;
            this.logger && this.logger.error(error.message);
            throw error;
        }
    }
}
exports.TwitterClient = TwitterClient;
//# sourceMappingURL=twitter-client.js.map