export enum TwitterErrorCode {
  GenericError = 0,
  HttpRequestError,
  DuplicateRule,
  MalformedPayload,
  NoResponseFromTwitter,
}

export class TwitterError extends Error {
  constructor(public message: string, public code?: TwitterErrorCode) {
    super(message);
    this.code = code ? code : TwitterErrorCode.GenericError;
  }
}
