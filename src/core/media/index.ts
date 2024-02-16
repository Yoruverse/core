export * from "./utils";
import { Yoru, YoruError, Anime, Manga, Database, Countries } from "../../core";
import { GetMediaByTitleOptions, TableConstructor, ReadMediaOptions, ReadMediaResponse, MediaResponse } from "../../types";

export class Media {

    private client: Yoru;
    private database: Database;

    constructor(constructor: TableConstructor) {
        this.client = constructor.yoru;
        this.database = new Database({ yoru: this.client, databaseId: "yoruapi" });
    }

    public async read(options: ReadMediaOptions): Promise<ReadMediaResponse> {
        try {
            const { by, value } = options;
            const { createQuery } = this.database;

            if (by === "ID") {

                const res: any = this.database.readDocuments({
                    collection: "media",
                    query: [
                        createQuery.equal("id", value)
                    ]
                })

                return res;

            }

            const { exact, limit } = options;

            const res: any = this.database.readDocuments({
                collection: "media",
                query: [
                    exact ? createQuery.equal("title", value) : createQuery.search("title", value),
                    createQuery.limit(limit || 10)
                ]
            })

            return res;

        } catch (error: any) {

            throw new YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });

        }
    }

    public async write(media: Anime | Manga) {
        try {

            if (!media.data) throw new YoruError({
                name: "SYNTAX_ERROR",
                code: 400,
                cause: "Media data is required for this method"
            });

            const country = new Countries({ yoru: this.client });

            const title = JSON.stringify(media.data.title);
            const description = media.data.description && JSON.stringify(media.data.description);
            const country_of_origin = media.data.country_of_origin && (await country.get(media.data.country_of_origin.code)).$id;

            const res: any = await this.database.writeDocument({ collection: "media", data: { ...media.data, title, description, country_of_origin, id: null } });

            if ((res as MediaResponse).type === "ANIME") {
                return new Anime().set(res);
            } else {
                return new Manga().set(res);
            }


        } catch (error: any) {

            throw new YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });

        }
    }

    public async getMediaById(id: number) {
        try {

            const res = await this.read({ by: "ID", value: id });
            const media = res.documents[0];

            if (media.type === "ANIME") {

                return new Anime().set(media);

            }

            return new Manga().set(media);


        } catch (error: any) {

            throw new YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });

        }
    }

    public async getMediaByTitle(params: GetMediaByTitleOptions) {
        try {

            const { title, limit, exact } = params;

            const res = await this.read({ by: "TITLE", value: title, limit: limit || 1, exact: exact || false });
            const documents = res.documents;

            return documents.map((media) => {

                if (media.type === "ANIME") {

                    return new Anime().set(media);

                }

                return new Manga().set(media);
            })

        } catch (error: any) {

            throw new YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });

        }
    }

    public static isAnime(media: Anime | Manga): media is Anime {
        return media instanceof Anime;
    }

    public static isManga(media: Anime | Manga): media is Manga {
        return media instanceof Manga;
    }

}