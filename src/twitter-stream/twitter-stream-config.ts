import {Tweet, User} from '../interfaces/tweet';
import {StreamRule} from '../interfaces/twitter-stream-rule';

export enum Expansion {
  attachments_poll_ids = 'attachments.poll_ids',
  attachments_media_keys = 'attachments.media_keys',
  author_id = 'author_id',
  entities_mentions_username = 'entities.mentions.username',
  geo_place_id = 'geo.place_id',
  in_reply_to_user_id = 'in_reply_to_user_id',
  referenced_tweets_id = 'referenced_tweets.id',
  referenced_tweets_id_author_id = 'referenced_tweets.id.author_id',
}

export enum MediaFields {
  duration_ms = 'duration_ms',
  height = 'height',
  media_key = 'media_key',
  preview_image_url = 'preview_image_url',
  type = 'type',
  url = 'url',
  width = 'width',
  public_metrics = 'public_metrics',
  alt_text = 'alt_text',
}

export enum PlaceFields {
  contained_within = 'contained_within',
  country = 'country',
  country_code = 'country_code',
  full_name = 'full_name',
  geo = 'geo',
  id = 'id',
  name = 'name',
  place_type = 'place_type',
  url = 'url',
}

export enum PollFields {
  duration_minutes = 'duration_minutes',
  end_datetime = 'end_datetime',
  id = 'id',
  options = 'options',
  voting_status = 'voting_status',
}

export enum UserFields {
  created_at = 'created_at',
  description = 'description',
  entities = 'entities',
  id = 'id',
  location = 'location',
  name = 'name',
  pinned_tweet_id = 'pinned_tweet_id',
  profile_image_url = 'profile_image_url',
  protected = 'protected',
  public_metrics = 'public_metrics',
  url = 'url',
  username = 'username',
  verified = 'verified',
  withheld = 'withheld',
}

export enum TweetFields {
  attachments = 'attachments',
  author_id = 'author_id',
  context_annotations = 'context_annotations',
  conversation_id = 'conversation_id',
  created_at = 'created_at',
  entities = 'entities',
  geo = 'geo',
  id = 'id',
  in_reply_to_user_id = 'in_reply_to_user_id',
  lang = 'lang',
  public_metrics = 'public_metrics',
  possibly_sensitive = 'possibly_sensitive',
  referenced_tweets = 'referenced_tweets',
  reply_settings = 'reply_settings',
  source = 'source',
  text = 'text',
  withheld = 'withheld',
}

export interface StreamClientConfig {
  // Reference https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream
  backfillMinutes?: number;
  expansions?: Expansion[];
  mediaFields?: MediaFields[];
  placeFields?: PlaceFields[];
  pollFields?: PollFields[];
  userFields?: UserFields[];
  tweetFields?: TweetFields[];
}

export const everythingStreamConfig: StreamClientConfig = {
  expansions: [
    Expansion.author_id,
    Expansion.entities_mentions_username,
    Expansion.geo_place_id,
    Expansion.in_reply_to_user_id,
    Expansion.referenced_tweets_id,
    Expansion.referenced_tweets_id_author_id,
  ],
  mediaFields: [
    MediaFields.media_key,
    MediaFields.type,
    MediaFields.preview_image_url,
    MediaFields.public_metrics,
    MediaFields.alt_text,
  ],
  placeFields: [
    PlaceFields.country,
    PlaceFields.geo,
    PlaceFields.id,
    PlaceFields.name,
    PlaceFields.place_type,
    PlaceFields.url,
  ],
  pollFields: [
    PollFields.duration_minutes,
    PollFields.end_datetime,
    PollFields.id,
    PollFields.options,
    PollFields.voting_status,
  ],
  userFields: [
    UserFields.id,
    UserFields.username,
    UserFields.profile_image_url,
    UserFields.verified,
    UserFields.public_metrics,
    UserFields.withheld,
  ],
  tweetFields: [
    TweetFields.id,
    TweetFields.created_at,
    TweetFields.text,
    TweetFields.referenced_tweets,
    TweetFields.attachments,
    TweetFields.conversation_id,
    TweetFields.entities,
    TweetFields.public_metrics,
    TweetFields.possibly_sensitive,
    TweetFields.reply_settings,
    TweetFields.source,
    TweetFields.withheld,
  ],
};

export const defaultStreamConfig: StreamClientConfig = {
  expansions: [Expansion.author_id],
  mediaFields: [MediaFields.media_key, MediaFields.type],
  placeFields: [PlaceFields.country, PlaceFields.geo],
  pollFields: [],
  userFields: [
    UserFields.id,
    UserFields.username,
    UserFields.profile_image_url,
  ],
  tweetFields: [
    TweetFields.id,
    TweetFields.created_at,
    TweetFields.text,
    TweetFields.referenced_tweets,
    TweetFields.attachments,
    TweetFields.conversation_id,
    TweetFields.entities,
    TweetFields.public_metrics,
  ],
};

export interface StreamDataObject {
  data: Tweet;
  includes?: {
    users?: User[];
    tweets?: Tweet[];
  };
  matching_rulse?: StreamRule[];
}
