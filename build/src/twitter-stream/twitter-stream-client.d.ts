import { Tweet } from '../interfaces/tweet';
import { Logger } from '../common/logger';
import { Request } from 'request';
import { StreamClientConfig } from './twitter-stream-config';
import { TweetObservableClient } from './twitter-stream-observable';
import { TwitterAuth } from '../auth';
export interface StreamListener {
    onConnectionOpen?: () => void;
    onTweet?: (tweet: Tweet) => void;
    onError?: (error: Error) => void;
    onConnectionClose?: () => void;
}
export declare class TwitterStreamClient extends TweetObservableClient {
    protected streamConfig: StreamClientConfig;
    protected stream?: Request;
    protected isStreaming: boolean;
    constructor(config: {
        keys: TwitterAuth;
        streamConfig: StreamClientConfig;
        logger?: Logger;
    });
    buildStreamUrl(): string;
    startMonitoring(): Request;
    stopMonitoring(): Promise<void>;
}
