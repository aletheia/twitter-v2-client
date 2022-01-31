import {Config} from '../common/config';
import {Logger} from '../common/logger';
import {inject, injectable} from 'tsyringe';

@injectable()
export class TwitterAuth {
  public consumerKey: string;
  public consumerSecret: string;
  public accessTokenKey: string;
  public accessTokenSecret: string;
  public bearerToken: string;

  constructor(
    @inject('Logger') protected logger: Logger,
    @inject('Config') protected config: Config
  ) {
    this.logger = logger;
    this.config = config;
    this.consumerKey = config.get('TWITTER_CONSUMER_KEY');
    this.consumerSecret = config.get('TWITTER_CONSUMER_SECRET');
    this.accessTokenKey = config.get('TWITTER_ACCESS_TOKEN_KEY');
    this.accessTokenSecret = config.get('TWITTER_ACCESS_TOKEN_SECRET');
    this.bearerToken = config.get('TWITTER_BEARER_TOKEN');
  }
}
