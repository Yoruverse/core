"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const node_appwrite_1 = require("node-appwrite");
const core_1 = require("../../core");
class Database {
    _yoru;
    _databaseId;
    constructor(constructor) {
        this._yoru = constructor.yoru;
        this._databaseId = constructor.databaseId;
    }
    get createQuery() {
        return node_appwrite_1.Query;
    }
    async readDocuments(options) {
        try {
            const { collection, query } = options;
            const { database } = this._yoru;
            return await database.listDocuments(this._databaseId, collection, query);
        }
        catch (error) {
            throw new core_1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
    async writeDocument(options) {
        try {
            const { collection, data } = options;
            const { database } = this._yoru;
            return await database.createDocument(this._databaseId, collection, node_appwrite_1.ID.unique(), data);
        }
        catch (error) {
            throw new core_1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
}
exports.Database = Database;
