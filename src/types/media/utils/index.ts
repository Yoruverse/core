import { MediaRequired, MediaNullable, NullableInterface } from "../../../types";

export interface Title {
    romaji: string;
    english: string;
    native: string;
}

export interface Description {
    en: string;
    jp: string;
    es: string;
}

export type DatabaseMedia = Omit<(MediaRequired & NullableInterface<MediaNullable>), "title" | "description">

export type AnimeProps = {
    title: Title;
    description: Description | null;
    type?: "ANIME";
} & Omit<DatabaseMedia, "chapters" | "volumes">

export type MangaProps = {
    title: Title;
    description: Description | null;
    type?: "MANGA";
} & Omit<DatabaseMedia, "episodes" | "duration">
