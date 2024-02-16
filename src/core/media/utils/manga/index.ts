import { YoruError } from "../../../../core";
import { Manga as Props, MediaResponse, Description, Title } from "../../../../types";
import { Models } from "node-appwrite";

export class Manga {

    private _data: Props | undefined = undefined;

    public set(params: MediaResponse & Models.Document | Props) {
        try {

            if ("$id" in params && params.type && params.type !== "MANGA") throw new YoruError({
                name: "TYPE_ERROR",
                code: 400,
                cause: "Manga type is required for this method"
            });

            if ("$id" in params) {

                const title: Title = JSON.parse(params.title);
                const description: Description | null = params.description && JSON.parse(params.description);
                const country_of_origin = params.country_of_origin && {
                    code: params.country_of_origin.code,
                    es_name: params.country_of_origin.es_name,
                    en_name: params.country_of_origin.en_name,
                    jp_name: params.country_of_origin.jp_name
                }

                const res: Props = {
                    id: params.id,
                    type: "MANGA",
                    title,
                    status: params.status,
                    source: params.source,
                    format: params.format,
                    anilist_id: params.anilist_id,
                    myanimelist_id: params.myanimelist_id,
                    kitsu_id: params.kitsu_id,
                    start_date: params.start_date,
                    end_date: params.end_date,
                    season: params.season,
                    chapters: params.chapters,
                    volumes: params.volumes,
                    nsfw: params.nsfw,
                    average_score: params.average_score,
                    score_count: params.score_count,
                    trailer: params.trailer,
                    cover_image: params.cover_image,
                    banner_image: params.banner_image,
                    hashtag: params.hashtag,
                    description,
                    country_of_origin: country_of_origin
                }

                this._data = res;
                return this;
            }

            this._data = { ...params, type: "MANGA" };
            return this;

        } catch (error: any) {

            throw new YoruError({
                name: error.name || "INTERNAL_ERROR",
                code: error.code || 500,
                cause: error.message
            });

        }
    }

    public get data() {
        return this._data;
    }

}