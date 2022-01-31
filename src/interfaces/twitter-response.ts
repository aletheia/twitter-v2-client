export interface TwitterResponseMeta {
  code?: number;
  errorType?: string;
  errorMessage?: string;
  sent?: string;
}

export interface TwitterResponsePayload<T> {
  data: T[];
  meta: TwitterResponseMeta;
}

export class TwitterResponse<T> {
  private data: T[];
  private meta?: TwitterResponseMeta;

  static fromJson<T>(json: {
    data: T[];
    meta: TwitterResponseMeta;
  }): TwitterResponse<T> {
    const response = new TwitterResponse<T>({data: json.data, meta: json.meta});
    return response;
  }

  constructor(response: TwitterResponsePayload<T>) {
    this.data = response.data;
    this.meta = response.meta;
  }

  unwrap(): T[] {
    return this.data;
  }
}
