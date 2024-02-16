import { Client as AwClient, Databases as AwDatabase } from "node-appwrite";
import { ClientConstructor } from "../../types";

export class Yoru {
    private apiKeys: string;
    private _client: AwClient;
    private _database: AwDatabase;

    constructor(constructor: ClientConstructor) {
        this.apiKeys = constructor.apiKey;
        this._client = new AwClient();
        this._client.setEndpoint("https://aw.yoruverse.com/v1").setProject("yoruverse");
        this._client.setKey(this.apiKeys);
        this._database = new AwDatabase(this._client);
    }

    public get database() {
        return this._database;
    }

    public get client() {
        return this._client;
    }
}