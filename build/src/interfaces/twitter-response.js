"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterResponse = void 0;
class TwitterResponse {
    constructor(response) {
        this.data = response.data;
        this.meta = response.meta;
    }
    static fromJson(json) {
        const response = new TwitterResponse({ data: json.data, meta: json.meta });
        return response;
    }
    unwrap() {
        return this.data;
    }
}
exports.TwitterResponse = TwitterResponse;
//# sourceMappingURL=twitter-response.js.map