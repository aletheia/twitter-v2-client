"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetObservableClient = void 0;
const twitter_client_1 = require("./twitter-client");
class TweetObservableClient extends twitter_client_1.TwitterClient {
    constructor(config) {
        super(config.keys, config.logger);
        this.listeners = [];
    }
    addListener(listener) {
        if (!this.listeners.includes(listener)) {
            this.listeners.push(listener);
        }
    }
    onConnectionOpen() {
        this.listeners.forEach(listener => {
            listener.onConnectionOpen && listener.onConnectionOpen();
        });
    }
    onConnectionClose() {
        this.listeners.forEach(listener => {
            listener.onConnectionClose && listener.onConnectionClose();
        });
    }
    onError(error) {
        this.listeners.forEach(listener => {
            listener.onError && listener.onError(error);
        });
    }
    onTweet(tweet) {
        this.listeners.forEach(listener => {
            listener.onTweet && listener.onTweet(tweet);
        });
    }
    removeListener(listener) {
        const index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }
}
exports.TweetObservableClient = TweetObservableClient;
//# sourceMappingURL=twitter-stream-observable.js.map