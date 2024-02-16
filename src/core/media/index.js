"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Media = void 0;
__exportStar(require("./utils"), exports);
const core_1 = require("../../core");
class Media {
    client;
    database;
    constructor(constructor) {
        this.client = constructor.yoru;
        this.database = new core_1.Database({ yoru: this.client, databaseId: "yoruapi" });
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
            throw new core_1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
    async write(media) {
        try {
            if (!media.data)
                throw new core_1.YoruError({
                    name: "SYNTAX_ERROR",
                    code: 400,
                    cause: "Media data is required for this method"
                });
            const country = new core_1.Countries({ yoru: this.client });
            const title = JSON.stringify(media.data.title);
            const description = media.data.description && JSON.stringify(media.data.description);
            const country_of_origin = media.data.country_of_origin && (await country.get(media.data.country_of_origin.code)).$id;
            const res = await this.database.writeDocument({ collection: "media", data: { ...media.data, title, description, country_of_origin, id: null } });
            if (res.type === "ANIME") {
                return new core_1.Anime().set(res);
            }
            else {
                return new core_1.Manga().set(res);
            }
        }
        catch (error) {
            throw new core_1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
    async getMediaById(id) {
        try {
            const res = await this.read({ by: "ID", value: id });
            const media = res.documents[0];
            if (media.type === "ANIME") {
                return new core_1.Anime().set(media);
            }
            return new core_1.Manga().set(media);
        }
        catch (error) {
            throw new core_1.YoruError({
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
            return documents.map((media) => {
                if (media.type === "ANIME") {
                    return new core_1.Anime().set(media);
                }
                return new core_1.Manga().set(media);
            });
        }
        catch (error) {
            throw new core_1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
    static isAnime(media) {
        return media instanceof core_1.Anime;
    }
    static isManga(media) {
        return media instanceof core_1.Manga;
    }
}
exports.Media = Media;
