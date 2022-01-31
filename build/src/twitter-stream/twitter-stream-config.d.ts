import { Tweet, User } from '../interfaces/tweet';
import { StreamRule } from '../interfaces/twitter-stream-rule';
export declare enum Expansion {
    attachments_poll_ids = "attachments.poll_ids",
    attachments_media_keys = "attachments.media_keys",
    author_id = "author_id",
    entities_mentions_username = "entities.mentions.username",
    geo_place_id = "geo.place_id",
    in_reply_to_user_id = "in_reply_to_user_id",
    referenced_tweets_id = "referenced_tweets.id",
    referenced_tweets_id_author_id = "referenced_tweets.id.author_id"
}
export declare enum MediaFields {
    duration_ms = "duration_ms",
    height = "height",
    media_key = "media_key",
    preview_image_url = "preview_image_url",
    type = "type",
    url = "url",
    width = "width",
    public_metrics = "public_metrics",
    alt_text = "alt_text"
}
export declare enum PlaceFields {
    contained_within = "contained_within",
    country = "country",
    country_code = "country_code",
    full_name = "full_name",
    geo = "geo",
    id = "id",
    name = "name",
    place_type = "place_type",
    url = "url"
}
export declare enum PollFields {
    duration_minutes = "duration_minutes",
    end_datetime = "end_datetime",
    id = "id",
    options = "options",
    voting_status = "voting_status"
}
export declare enum UserFields {
    created_at = "created_at",
    description = "description",
    entities = "entities",
    id = "id",
    location = "location",
    name = "name",
    pinned_tweet_id = "pinned_tweet_id",
    profile_image_url = "profile_image_url",
    protected = "protected",
    public_metrics = "public_metrics",
    url = "url",
    username = "username",
    verified = "verified",
    withheld = "withheld"
}
export declare enum TweetFields {
    attachments = "attachments",
    author_id = "author_id",
    context_annotations = "context_annotations",
    conversation_id = "conversation_id",
    created_at = "created_at",
    entities = "entities",
    geo = "geo",
    id = "id",
    in_reply_to_user_id = "in_reply_to_user_id",
    lang = "lang",
    public_metrics = "public_metrics",
    possibly_sensitive = "possibly_sensitive",
    referenced_tweets = "referenced_tweets",
    reply_settings = "reply_settings",
    source = "source",
    text = "text",
    withheld = "withheld"
}
export interface StreamClientConfig {
    backfillMinutes?: number;
    expansions?: Expansion[];
    mediaFields?: MediaFields[];
    placeFields?: PlaceFields[];
    pollFields?: PollFields[];
    userFields?: UserFields[];
    tweetFields?: TweetFields[];
}
export declare const everythingStreamConfig: StreamClientConfig;
export declare const defaultStreamConfig: StreamClientConfig;
export interface StreamDataObject {
    data: Tweet;
    includes?: {
        users?: User[];
        tweets?: Tweet[];
    };
    matching_rulse?: StreamRule[];
}
