import {StreamListener, Tweet, TwitterKeys} from '..';
import {Logger} from '../common/logger';
import {TwitterClient} from './twitter-client';

export class TweetObservableClient extends TwitterClient<Tweet> {
  protected listeners: StreamListener[];

  constructor(config: {keys: TwitterKeys; logger?: Logger}) {
    super(config.keys, config.logger);
    this.listeners = [];
  }

  public addListener(listener: StreamListener) {
    if (!this.listeners.includes(listener)) {
      this.listeners.push(listener);
    }
  }

  public onConnectionOpen() {
    this.listeners.forEach(listener => {
      listener.onConnectionOpen && listener.onConnectionOpen();
    });
  }

  public onConnectionClose() {
    this.listeners.forEach(listener => {
      listener.onConnectionClose && listener.onConnectionClose();
    });
  }

  public onError(error: Error) {
    this.listeners.forEach(listener => {
      listener.onError && listener.onError(error);
    });
  }

  public onTweet(tweet: Tweet) {
    this.listeners.forEach(listener => {
      listener.onTweet && listener.onTweet(tweet);
    });
  }

  public removeListener(listener: StreamListener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}
