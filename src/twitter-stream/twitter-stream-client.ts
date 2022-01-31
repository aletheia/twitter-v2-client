import {Tweet} from '../interfaces/tweet';
import {Logger} from '../common/logger';
import {TWITTER_STREAM_URL} from './twitter-constants';

import {get, Request} from 'request';
import {
  defaultStreamConfig,
  StreamClientConfig,
  StreamDataObject,
} from './twitter-stream-config';
import {TweetObservableClient} from './twitter-stream-observable';
import {inject, injectable} from 'tsyringe';
import {TwitterAuth} from '../auth';

export interface StreamListener {
  onConnectionOpen?: () => void;
  onTweet?: (tweet: Tweet) => void;
  onError?: (error: Error) => void;
  onConnectionClose?: () => void;
}

// TODO: checkout https://stackoverflow.com/questions/65407349/streaming-axios-response-from-a-get-request-in-nodejs
@injectable()
export class TwitterStreamClient extends TweetObservableClient {
  protected streamConfig: StreamClientConfig;
  protected stream?: Request;
  protected isStreaming: boolean;

  constructor(
    @inject('TwitterStreamConfig')
    config: {
      keys: TwitterAuth;
      streamConfig: StreamClientConfig;
      logger?: Logger;
    }
  ) {
    super({keys: config.keys, logger: config.logger});

    this.streamConfig = Object.assign(
      {},
      defaultStreamConfig,
      config.streamConfig
    );

    this.isStreaming = false;
  }

  buildStreamUrl() {
    const config = this.streamConfig;
    const backfillMinutes = config.backfillMinutes
      ? `backfill_minutes=${config.backfillMinutes}`
      : undefined;
    const expansions = config.expansions
      ? `expansions=${config.expansions.join(',')}`
      : undefined;
    const mediaFields = config.mediaFields
      ? `media.fields=${config.mediaFields.join(',')}`
      : undefined;
    const pollFields = config.pollFields
      ? `poll.fields=${config.pollFields.join(',')}`
      : undefined;
    const userFields = config.userFields
      ? `user.fields=${config.userFields.join(',')}`
      : undefined;
    const tweetFields = config.tweetFields
      ? `tweet.fields=${config.tweetFields.join(',')}`
      : undefined;
    const streamConfigurations = [
      backfillMinutes,
      expansions,
      mediaFields,
      pollFields,
      userFields,
      tweetFields,
    ].filter(sc => sc);
    if (streamConfigurations.length === 0) {
      return TWITTER_STREAM_URL;
    } else {
      let params = streamConfigurations.join('&');
      params = params.startsWith('&') ? params.replace('&', '?') : `?${params}`;
      this.logger && this.logger.info(`Streaming params: ${params}`);
      return `${TWITTER_STREAM_URL}${params}`;
    }
  }

  startMonitoring() {
    const config = {
      url: this.buildStreamUrl(),
      auth: {
        bearer: this.keys.bearerToken,
      },
      timeout: 31000,
    };

    const stream = get(config);

    this.stream = stream;
    this.isStreaming = true;
    this.onConnectionOpen();

    stream
      .on('connect', () => {
        this.logger && this.logger.info('Connected to Twitter stream');
      })
      .on('data', (chunk: Buffer) => {
        const serializedTweet = chunk.toString();
        if (serializedTweet !== '\r\n') {
          this.logger && this.logger.info('Received data from Twitter stream');
          try {
            const scData: StreamDataObject = JSON.parse(serializedTweet);
            this.onTweet(scData.data);
          } catch (e) {
            const error = e as Error;
            this.logger && this.logger.error(error.message);
          }
        }
      })
      .on('error', (error: {code: string}) => {
        this.onError(new Error(error.code));
        if (error.code === 'ECONNRESET') {
          if (this.isStreaming) {
            this.logger &&
              this.logger.info(
                'Twitter stream connection reset, reconnecting...'
              );
            this.startMonitoring();
          }
        } else if (error.code === 'ETIMEDOUT') {
          stream.emit('timeout');
          this.logger && this.logger.error(JSON.stringify(error));
        } else {
          this.logger && this.logger.error(JSON.stringify(error));
        }
      })
      .on('close', () => {
        this.logger &&
          this.logger.info(
            'Stream has been destroyed and file has been closed'
          );
        this.onConnectionClose();
      });

    return stream;
  }

  async stopMonitoring() {
    this.logger && this.logger.info('Stopping Twitter stream');
    this.stream && this.stream.abort();
    this.isStreaming = false;
  }
}
