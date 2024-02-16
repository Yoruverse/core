"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Countries = void 0;
const __1 = require("..");
class Countries {
    client;
    database;
    constructor(constructor) {
        this.client = constructor.yoru;
        this.database = new __1.Database({ yoru: this.client, databaseId: "yoruapi" });
    }
    async get(param) {
        try {
            let country = await this.database.readDocuments({
                collection: "country_codes",
                query: [
                    this.database.createQuery.equal("code", param),
                ]
            });
            return country.documents[0];
        }
        catch (error) {
            throw new __1.YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });
        }
    }
}
exports.Countries = Countries;
