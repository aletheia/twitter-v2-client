export interface TwitterResponseMeta {
    code?: number;
    errorType?: string;
    errorMessage?: string;
    sent?: string;
}
export interface TwitterResponsePayload {
    data: any;
    meta: TwitterResponseMeta;
}
export declare class TwitterResponse<T> {
    private data;
    private meta?;
    static fromJson<T>(json: any): TwitterResponse<T>;
    constructor(response: {
        data: T[];
        meta?: TwitterResponseMeta;
    });
    unwrap(): T[];
}
