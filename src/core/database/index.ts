import { Query, ID } from "node-appwrite";
import { YoruError, Yoru } from "../../core";
import { DatabaseConstructor, ReadDocumentsOptions, WriteDocumentOptions } from "../../types";

export class Database {

    private _yoru: Yoru;
    private _databaseId: string;

    constructor(constructor: DatabaseConstructor) {
        this._yoru = constructor.yoru;
        this._databaseId = constructor.databaseId;
    }

    public get createQuery() {
        return Query;
    }

    public async readDocuments(options: ReadDocumentsOptions) {
        try {

            const { collection, query } = options;
            const { database } = this._yoru;

            return await database.listDocuments(this._databaseId, collection, query);

        } catch (error: any) {

            throw new YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });

        }
    }

    public async writeDocument(options: WriteDocumentOptions) {
        try {

            const { collection, data } = options;
            const { database } = this._yoru;

            return await database.createDocument(this._databaseId, collection, ID.unique(), data);

        } catch (error: any) {

            throw new YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });

        }
    }

}