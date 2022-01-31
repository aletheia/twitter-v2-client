import axios, {Method, ResponseType} from 'axios';
import {Logger} from '../common/logger';
import {TwitterKeys} from '../interfaces/twitter-keys';

import {
  TwitterResponse,
  TwitterResponsePayload,
} from '../interfaces/twitter-response';

export interface ClientConfiguration {
  url: string;
  method?: Method;
  data?: unknown;
  responseType?: ResponseType;
  timeout?: number;
}
export class TwitterClient<T> {
  constructor(protected keys: TwitterKeys, protected logger?: Logger) {
    this.logger = logger;
    this.keys = keys;
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${this.keys.bearerToken}`;
  }

  protected clientHeaders() {
    return {
      'content-type': 'application/json',
      authorization: `Bearer ${this.keys.bearerToken}`,
    };
  }

  async client(config: ClientConfiguration) {
    const defaultConfig: Partial<ClientConfiguration> = {
      timeout: 30000,
      responseType: 'json',
      method: 'GET',
    };
    config = Object.assign({}, defaultConfig, config);
    const {url, method, data, responseType, timeout} = config;
    return axios({
      url,
      method,
      data,
      responseType,
      timeout,
      headers: this.clientHeaders(),
      validateStatus: status => status < 400,
    });
  }

  protected async doClientRequest(
    method: Method,
    url: string,
    data?: unknown
  ): Promise<T[]> {
    try {
      const response = await this.client({url, method, data});
      const payload = response.data as TwitterResponsePayload;
      const twitterResponse = TwitterResponse.fromJson<T>(payload);
      return twitterResponse.unwrap();
    } catch (e) {
      const error: Error = e as Error;
      this.logger && this.logger.error(error.message);
      throw error;
    }
  }
}
