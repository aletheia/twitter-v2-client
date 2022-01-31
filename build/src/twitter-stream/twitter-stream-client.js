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
exports.TwitterStreamClient = void 0;
const twitter_constants_1 = require("./twitter-constants");
const request_1 = require("request");
const twitter_stream_config_1 = require("./twitter-stream-config");
const twitter_stream_observable_1 = require("./twitter-stream-observable");
const tsyringe_1 = require("tsyringe");
// TODO: checkout https://stackoverflow.com/questions/65407349/streaming-axios-response-from-a-get-request-in-nodejs
let TwitterStreamClient = class TwitterStreamClient extends twitter_stream_observable_1.TweetObservableClient {
    constructor(config) {
        super({ keys: config.keys, logger: config.logger });
        this.streamConfig = Object.assign({}, twitter_stream_config_1.defaultStreamConfig, config.streamConfig);
        this.isStreaming = false;
    }
    buildStreamUrl() {
        const config = this.streamConfig;
        const backfillMinutes = config.backfillMinutes
            ? `backfill_minutes=${config.backfillMinutes}`
            : undefined;
        const expansions = config.expansions
            ? `expansions=${config.expansions.join(',')}`
            : undefined;
        const mediaFields = config.mediaFields
            ? `media.fields=${config.mediaFields.join(',')}`
            : undefined;
        const pollFields = config.pollFields
            ? `poll.fields=${config.pollFields.join(',')}`
            : undefined;
        const userFields = config.userFields
            ? `user.fields=${config.userFields.join(',')}`
            : undefined;
        const tweetFields = config.tweetFields
            ? `tweet.fields=${config.tweetFields.join(',')}`
            : undefined;
        const streamConfigurations = [
            backfillMinutes,
            expansions,
            mediaFields,
            pollFields,
            userFields,
            tweetFields,
        ].filter(sc => sc);
        if (streamConfigurations.length === 0) {
            return twitter_constants_1.TWITTER_STREAM_URL;
        }
        else {
            let params = streamConfigurations.join('&');
            params = params.startsWith('&') ? params.replace('&', '?') : `?${params}`;
            this.logger && this.logger.info(`Streaming params: ${params}`);
            return `${twitter_constants_1.TWITTER_STREAM_URL}${params}`;
        }
    }
    startMonitoring() {
        const config = {
            url: this.buildStreamUrl(),
            auth: {
                bearer: this.keys.bearerToken,
            },
            timeout: 31000,
        };
        const stream = (0, request_1.get)(config);
        this.stream = stream;
        this.isStreaming = true;
        this.onConnectionOpen();
        stream
            .on('connect', () => {
            this.logger && this.logger.info('Connected to Twitter stream');
        })
            .on('data', (chunk) => {
            const serializedTweet = chunk.toString();
            if (serializedTweet !== '\r\n') {
                this.logger && this.logger.info('Received data from Twitter stream');
                try {
                    const scData = JSON.parse(serializedTweet);
                    this.onTweet(scData.data);
                }
                catch (e) {
                    const error = e;
                    this.logger && this.logger.error(error.message);
                }
            }
        })
            .on('error', (error) => {
            this.onError(new Error(error.code));
            if (error.code === 'ECONNRESET') {
                if (this.isStreaming) {
                    this.logger &&
                        this.logger.info('Twitter stream connection reset, reconnecting...');
                    this.startMonitoring();
                }
            }
            else if (error.code === 'ETIMEDOUT') {
                stream.emit('timeout');
                this.logger && this.logger.error(JSON.stringify(error));
            }
            else {
                this.logger && this.logger.error(JSON.stringify(error));
            }
        })
            .on('close', () => {
            this.logger &&
                this.logger.info('Stream has been destroyed and file has been closed');
            this.onConnectionClose();
        });
        return stream;
    }
    async stopMonitoring() {
        this.logger && this.logger.info('Stopping Twitter stream');
        this.stream && this.stream.abort();
        this.isStreaming = false;
    }
};
TwitterStreamClient = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('TwitterStreamConfig')),
    __metadata("design:paramtypes", [Object])
], TwitterStreamClient);
exports.TwitterStreamClient = TwitterStreamClient;
//# sourceMappingURL=twitter-stream-client.js.map