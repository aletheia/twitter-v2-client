import { StreamListener, Tweet, TwitterKeys } from '..';
import { Logger } from '../common/logger';
import { TwitterClient } from './twitter-client';
export declare class TweetObservableClient extends TwitterClient<Tweet> {
    protected listeners: StreamListener[];
    constructor(config: {
        keys: TwitterKeys;
        logger?: Logger;
    });
    addListener(listener: StreamListener): void;
    onConnectionOpen(): void;
    onConnectionClose(): void;
    onError(error: Error): void;
    onTweet(tweet: Tweet): void;
    removeListener(listener: StreamListener): void;
}
