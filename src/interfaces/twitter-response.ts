export interface TwitterResponseMeta {
  code?: number;
  errorType?: string;
  errorMessage?: string;
  sent?: string;
}

export interface TwitterResponsePayload {
  data: any;
  meta: TwitterResponseMeta;
}

export class TwitterResponse<T> {
  private data: T[];
  private meta?: TwitterResponseMeta;

  static fromJson<T>(json: any): TwitterResponse<T> {
    const response = new TwitterResponse<T>({data: json.data, meta: json.meta});
    return response;
  }

  constructor(response: {data: T[]; meta?: TwitterResponseMeta}) {
    this.data = response.data;
    this.meta = response.meta;
  }

  unwrap(): T[] {
    return this.data;
  }
}
