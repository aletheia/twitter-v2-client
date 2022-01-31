import { TwitterClient } from './twitter-client';
import { Logger } from '../common/logger';
import { StreamRule } from '../interfaces/twitter-stream-rule';
import { TwitterAuth } from '../auth';
export declare class TwitterStreamRulesClient extends TwitterClient<StreamRule> {
    protected keys: TwitterAuth;
    protected rules: StreamRule[];
    constructor(keys: TwitterAuth, logger?: Logger);
    getRules(): Promise<StreamRule[]>;
    addRule(rule: Partial<StreamRule> & {
        value: string;
    }): Promise<void>;
    deleteRule(rule: Partial<StreamRule & {
        id: string;
    }>): Promise<void>;
    deleteAllRules(): Promise<void>;
}
