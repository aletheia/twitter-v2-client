export declare enum TwitterErrorCode {
    GenericError = 0,
    HttpRequestError = 1,
    DuplicateRule = 2,
    MalformedPayload = 3,
    NoResponseFromTwitter = 4
}
export declare class TwitterError extends Error {
    message: string;
    code?: TwitterErrorCode | undefined;
    constructor(message: string, code?: TwitterErrorCode | undefined);
}
