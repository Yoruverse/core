"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
const __1 = require("..");
const utils_1 = require("./utils");
class Media {
    client;
    database;
    constructor(constructor) {
        this.client = constructor.yoru;
        this.database = new __1.Database({ yoru: this.client, databaseId: "yoruapi" });
    }
    async read(options) {
        try {
            const { by, value } = options;
            const { createQuery } = this.database;
            if (by === "ID") {
                const res = this.database.readDocuments({
                    collection: "media",
                    query: [
                        createQuery.equal("id", value)
                    ]
                });
                return res;
            }
            const { exact, limit } = options;
            const res = this.database.readDocuments({
                collection: "media",
                query: [
                    exact ? createQuery.equal("title", value) : createQuery.search("title", value),
                    createQuery.limit(limit || 10)
                ]
            });
            return res;
        }
        catch (error) {
            throw new __1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
    async write(media) {
        try {
            if (!media.data)
                throw new __1.YoruError({
                    name: "SYNTAX_ERROR",
                    code: 400,
                    cause: "Media data is required for this method"
                });
            const country = new __1.Countries({ yoru: this.client });
            const title = JSON.stringify(media.data.title);
            const description = media.data.description && JSON.stringify(media.data.description);
            const country_of_origin = media.data.country_of_origin && (await country.get(media.data.country_of_origin.code)).$id;
            const res = await this.database.writeDocument({ collection: "media", data: { ...media.data, title, description, country_of_origin, id: null } });
            if (res.type === "ANIME") {
                return new utils_1.Anime().set(res);
            }
            else {
                return new utils_1.Manga().set(res);
            }
        }
        catch (error) {
            throw new __1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
    async getMediaById(id) {
        try {
            const res = await this.read({ by: "ID", value: id });
            if (res.documents.length === 0)
                return undefined;
            const media = res.documents[0];
            if (media.type === "ANIME") {
                return new utils_1.Anime().set(media);
            }
            return new utils_1.Manga().set(media);
        }
        catch (error) {
            throw new __1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
    async getMediaByTitle(params) {
        try {
            const { title, limit, exact } = params;
            const res = await this.read({ by: "TITLE", value: title, limit: limit || 1, exact: exact || false });
            const documents = res.documents;
            if (documents.length === 0)
                return [];
            return documents.map((media) => {
                if (media.type === "ANIME") {
                    return new utils_1.Anime().set(media);
                }
                return new utils_1.Manga().set(media);
            });
        }
        catch (error) {
            throw new __1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
    static isAnime(media) {
        return media instanceof utils_1.Anime;
    }
    static isManga(media) {
        return media instanceof utils_1.Manga;
    }
}
exports.Media = Media;
