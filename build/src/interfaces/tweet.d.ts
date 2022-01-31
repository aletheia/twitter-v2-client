export interface User {
    id: string;
    name: string;
    username: string;
    profile_image_url?: string;
    public_metrics?: UserMetrics;
    verified?: boolean;
}
export interface ContextAnnotation {
    domain: {
        id: string;
        name: string;
        description: string;
    };
    entity: {
        id: string;
        name: string;
    };
}
export interface Hashtag {
    start: number;
    end: number;
    tag: string;
}
export interface Mention {
    start: number;
    end: number;
    username: string;
    id: string;
}
export interface Metrics {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
}
export interface UserMetrics {
    follower_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
}
export interface Attachment {
    type: string;
    url: string;
    media_url: string;
    media_key: string;
    preview_image_url: string;
    alt_text: string;
}
export interface Url {
    start: number;
    end: number;
    url: string;
    expanded_url: string;
    display_url: string;
}
export interface Tweet {
    id: string;
    author_id: string;
    attachments?: Attachment[];
    context_annotations?: ContextAnnotation[];
    text: string;
    created_at?: string;
    conversation_id?: string;
    in_reply_to_user_id?: string;
    referenced_tweets?: {
        type: string;
        id: string;
    }[];
    geo?: {};
    entities?: {
        hashtags?: Hashtag[];
        mentions?: Mention[];
        urls?: Url[];
    };
    possibly_sensitive?: boolean;
    public_metrics?: Metrics;
    source: string;
    reply_settings: string;
}
