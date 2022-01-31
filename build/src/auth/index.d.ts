import { Config } from '../common/config';
import { Logger } from '../common/logger';
export declare class TwitterAuth {
    protected logger: Logger;
    protected config: Config;
    consumerKey: string;
    consumerSecret: string;
    accessTokenKey: string;
    accessTokenSecret: string;
    bearerToken: string;
    constructor(logger: Logger, config: Config);
}
