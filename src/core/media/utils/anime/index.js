"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anime = void 0;
const core_1 = require("../../../../core");
class Anime {
    _data = undefined;
    constructor() { }
    set(params) {
        try {
            if (params.type && params.type !== "ANIME")
                throw new core_1.YoruError({
                    name: "TYPE_ERROR",
                    code: 400,
                    cause: "Anime type is required for this method"
                });
            const title = JSON.parse(params.title);
            const description = params.description && JSON.parse(params.description);
            const country_of_origin = params.country_of_origin && {
                code: params.country_of_origin.code,
                es_name: params.country_of_origin.es_name,
                en_name: params.country_of_origin.en_name,
                jp_name: params.country_of_origin.jp_name
            };
            const res = {
                id: params.id,
                type: "ANIME",
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
                episodes: params.episodes,
                duration: params.duration,
                nsfw: params.nsfw,
                average_score: params.average_score,
                score_count: params.score_count,
                trailer: params.trailer,
                cover_image: params.cover_image,
                banner_image: params.banner_image,
                hashtag: params.hashtag,
                description,
                country_of_origin: country_of_origin
            };
            this._data = res;
            return this;
        }
        catch (error) {
            throw new core_1.YoruError({
                name: error.name || "INTERNAL_ERROR",
                code: error.code || 500,
                cause: error.message
            });
        }
    }
    setManually(params) {
        try {
            this._data = { ...params, type: "ANIME" };
            return this;
        }
        catch (error) {
            throw new core_1.YoruError({
                name: error.name || "INTERNAL_ERROR",
                code: error.code || 500,
                cause: error.message
            });
        }
    }
    get data() {
        return this._data;
    }
}
exports.Anime = Anime;
