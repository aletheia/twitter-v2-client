import { Method, ResponseType } from 'axios';
import { Logger } from '../common/logger';
import { TwitterKeys } from '../interfaces/twitter-keys';
export interface ClientConfiguration {
    url: string;
    method?: Method;
    data?: unknown;
    responseType?: ResponseType;
    timeout?: number;
}
export declare class TwitterClient<T> {
    protected keys: TwitterKeys;
    protected logger?: Logger | undefined;
    constructor(keys: TwitterKeys, logger?: Logger | undefined);
    protected clientHeaders(): {
        'content-type': string;
        authorization: string;
    };
    client(config: ClientConfiguration): Promise<import("axios").AxiosResponse<any, any>>;
    protected doClientRequest(method: Method, url: string, data?: unknown): Promise<T[]>;
}
