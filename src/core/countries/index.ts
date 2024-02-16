import { Models } from "node-appwrite";
import { Yoru, Database, YoruError } from "..";
import { TableConstructor, GetCountriesOptions, CountryOfOrigin } from "../../types";

export class Countries {

    private client: Yoru;
    private database: Database;

    constructor(constructor: TableConstructor) {
        this.client = constructor.yoru;
        this.database = new Database({ yoru: this.client, databaseId: "yoruapi" });
    }

    public async get(param: GetCountriesOptions) {
        try {

            let country = await this.database.readDocuments({
                collection: "country_codes",
                query: [
                    this.database.createQuery.equal("code", param as string),
                ]
            });

            return country.documents[0] as any as CountryOfOrigin & Models.Document;

        } catch (error: any) {

            throw new YoruError({
                name: "INTERNAL_ERROR",
                code: 500,
                cause: error.message
            });

        }
    }

}