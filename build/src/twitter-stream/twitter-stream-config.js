"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultStreamConfig = exports.everythingStreamConfig = exports.TweetFields = exports.UserFields = exports.PollFields = exports.PlaceFields = exports.MediaFields = exports.Expansion = void 0;
var Expansion;
(function (Expansion) {
    Expansion["attachments_poll_ids"] = "attachments.poll_ids";
    Expansion["attachments_media_keys"] = "attachments.media_keys";
    Expansion["author_id"] = "author_id";
    Expansion["entities_mentions_username"] = "entities.mentions.username";
    Expansion["geo_place_id"] = "geo.place_id";
    Expansion["in_reply_to_user_id"] = "in_reply_to_user_id";
    Expansion["referenced_tweets_id"] = "referenced_tweets.id";
    Expansion["referenced_tweets_id_author_id"] = "referenced_tweets.id.author_id";
})(Expansion = exports.Expansion || (exports.Expansion = {}));
var MediaFields;
(function (MediaFields) {
    MediaFields["duration_ms"] = "duration_ms";
    MediaFields["height"] = "height";
    MediaFields["media_key"] = "media_key";
    MediaFields["preview_image_url"] = "preview_image_url";
    MediaFields["type"] = "type";
    MediaFields["url"] = "url";
    MediaFields["width"] = "width";
    MediaFields["public_metrics"] = "public_metrics";
    MediaFields["alt_text"] = "alt_text";
})(MediaFields = exports.MediaFields || (exports.MediaFields = {}));
var PlaceFields;
(function (PlaceFields) {
    PlaceFields["contained_within"] = "contained_within";
    PlaceFields["country"] = "country";
    PlaceFields["country_code"] = "country_code";
    PlaceFields["full_name"] = "full_name";
    PlaceFields["geo"] = "geo";
    PlaceFields["id"] = "id";
    PlaceFields["name"] = "name";
    PlaceFields["place_type"] = "place_type";
    PlaceFields["url"] = "url";
})(PlaceFields = exports.PlaceFields || (exports.PlaceFields = {}));
var PollFields;
(function (PollFields) {
    PollFields["duration_minutes"] = "duration_minutes";
    PollFields["end_datetime"] = "end_datetime";
    PollFields["id"] = "id";
    PollFields["options"] = "options";
    PollFields["voting_status"] = "voting_status";
})(PollFields = exports.PollFields || (exports.PollFields = {}));
var UserFields;
(function (UserFields) {
    UserFields["created_at"] = "created_at";
    UserFields["description"] = "description";
    UserFields["entities"] = "entities";
    UserFields["id"] = "id";
    UserFields["location"] = "location";
    UserFields["name"] = "name";
    UserFields["pinned_tweet_id"] = "pinned_tweet_id";
    UserFields["profile_image_url"] = "profile_image_url";
    UserFields["protected"] = "protected";
    UserFields["public_metrics"] = "public_metrics";
    UserFields["url"] = "url";
    UserFields["username"] = "username";
    UserFields["verified"] = "verified";
    UserFields["withheld"] = "withheld";
})(UserFields = exports.UserFields || (exports.UserFields = {}));
var TweetFields;
(function (TweetFields) {
    TweetFields["attachments"] = "attachments";
    TweetFields["author_id"] = "author_id";
    TweetFields["context_annotations"] = "context_annotations";
    TweetFields["conversation_id"] = "conversation_id";
    TweetFields["created_at"] = "created_at";
    TweetFields["entities"] = "entities";
    TweetFields["geo"] = "geo";
    TweetFields["id"] = "id";
    TweetFields["in_reply_to_user_id"] = "in_reply_to_user_id";
    TweetFields["lang"] = "lang";
    TweetFields["public_metrics"] = "public_metrics";
    TweetFields["possibly_sensitive"] = "possibly_sensitive";
    TweetFields["referenced_tweets"] = "referenced_tweets";
    TweetFields["reply_settings"] = "reply_settings";
    TweetFields["source"] = "source";
    TweetFields["text"] = "text";
    TweetFields["withheld"] = "withheld";
})(TweetFields = exports.TweetFields || (exports.TweetFields = {}));
exports.everythingStreamConfig = {
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
exports.defaultStreamConfig = {
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
//# sourceMappingURL=twitter-stream-config.js.map