import { Models } from "node-appwrite";

import { NullableInterface, CountryOfOrigin } from "../../types";

export type MediaType = "ANIME" | "MANGA";
export type MediaSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";
export type MediaStatus = 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS' | 'DELAYED' | 'UNKOWN';
export type MediaSource = 'ORIGINAL' | 'MANGA' | 'LIGHT_NOVEL' | 'VISUAL_NOVEL' | 'VIDEO_GAME' | 'OTHER' | 'NOVEL' | 'DOUJINSHI' | 'ANIME' | 'WEB_NOVEL' | 'LIVE_ACTION' | 'GAME' | 'COMIC' | 'MULTIMEDIA_PROJECT' | 'PICTURE_BOOK' | 'MUSIC' | 'UNKNOWN';
export type MediaFormat = 'TV' | 'TV_SHORT' | 'MOVIE' | 'SPECIAL' | 'OVA' | 'ONA' | 'MUSIC' | 'MANGA' | 'NOVEL' | 'ONE_SHOT';

export type ReadMediaOptions = { by: "ID", value: number } | { by: "TITLE", value: string, limit?: number, exact?: boolean };
export type GetMediaByTitleOptions = { title: string, limit?: number, exact?: boolean };

/** MEDIA RESPONSES */

export interface MediaRequired {
    type: MediaType;
    title: string;
    status: MediaStatus;
    source: MediaSource;
    format: MediaFormat;
}

export interface MediaNullable {
    id: number;
    anilist_id: number;
    myanimelist_id: number;
    kitsu_id: string;
    start_date: Date;
    end_date: Date;
    season: MediaSeason | null;
    episodes: number;
    duration: number;
    chapters: number
    volumes: number;
    nsfw: boolean;
    average_score: number;
    score_count: number;
    trailer: string;
    cover_image: string;
    banner_image: string
    hashtag: string;
    description: string;
    country_of_origin: CountryOfOrigin;
};
export type MediaResponse = MediaRequired & NullableInterface<MediaNullable>;

/** --- */

export type ReadMediaResponse = Models.DocumentList<MediaResponse & Models.Document>;
export * from "./utils";