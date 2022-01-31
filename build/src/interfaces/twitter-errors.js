"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterError = exports.TwitterErrorCode = void 0;
var TwitterErrorCode;
(function (TwitterErrorCode) {
    TwitterErrorCode[TwitterErrorCode["GenericError"] = 0] = "GenericError";
    TwitterErrorCode[TwitterErrorCode["HttpRequestError"] = 1] = "HttpRequestError";
    TwitterErrorCode[TwitterErrorCode["DuplicateRule"] = 2] = "DuplicateRule";
    TwitterErrorCode[TwitterErrorCode["MalformedPayload"] = 3] = "MalformedPayload";
    TwitterErrorCode[TwitterErrorCode["NoResponseFromTwitter"] = 4] = "NoResponseFromTwitter";
})(TwitterErrorCode = exports.TwitterErrorCode || (exports.TwitterErrorCode = {}));
class TwitterError extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code;
        this.code = code ? code : TwitterErrorCode.GenericError;
    }
}
exports.TwitterError = TwitterError;
//# sourceMappingURL=twitter-errors.js.map