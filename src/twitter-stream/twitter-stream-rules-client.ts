import {TWITTER_STREAM_RULES_URL} from './twitter-constants';

import {TwitterClient} from './twitter-client';
import {Logger} from '../common/logger';
import {inject, injectable} from 'tsyringe';
import {StreamRule} from '../interfaces/twitter-stream-rule';
import {TwitterAuth} from '../auth';

@injectable()
export class TwitterStreamRulesClient extends TwitterClient<StreamRule> {
  protected rules: StreamRule[];

  constructor(
    @inject('TwitterAuth') protected keys: TwitterAuth,
    @inject('Logger') logger?: Logger
  ) {
    super(keys, logger);
    this.rules = [];
  }

  async getRules(): Promise<StreamRule[]> {
    const rules = await this.doClientRequest('GET', TWITTER_STREAM_RULES_URL);
    this.rules = rules ? rules : [];
    return this.rules;
  }

  async addRule(rule: Partial<StreamRule> & {value: string}) {
    try {
      await this.doClientRequest('POST', TWITTER_STREAM_RULES_URL, {
        add: [rule],
      });
      const rules = await this.getRules();
      this.rules = rules;
    } catch (e) {
      const error = e as Error;
      this.logger && this.logger.error(error.message);
      throw e;
    }
  }

  async deleteRule(rule: Partial<StreamRule & {id: string}>) {
    try {
      await this.doClientRequest('POST', TWITTER_STREAM_RULES_URL, {
        delete: {
          ids: [rule.id],
        },
      });
      await this.getRules();
    } catch (e) {
      const error = e as Error;
      this.logger && this.logger.error(error.message);
      throw error;
    }
  }

  async deleteAllRules() {
    const rules = await this.getRules();
    if (rules.length > 0) {
      await this.doClientRequest('POST', TWITTER_STREAM_RULES_URL, {
        delete: {
          ids: rules.map(rule => rule.id),
        },
      });
    }
  }
}
