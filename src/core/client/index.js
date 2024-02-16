"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yoru = void 0;
const node_appwrite_1 = require("node-appwrite");
class Yoru {
    apiKeys;
    _client;
    _database;
    constructor(constructor) {
        this.apiKeys = constructor.apiKey;
        this._client = new node_appwrite_1.Client();
        this._client.setEndpoint("https://aw.yoruverse.com/v1").setProject("yoruverse");
        this._client.setKey(this.apiKeys);
        this._database = new node_appwrite_1.Databases(this._client);
    }
    get database() {
        return this._database;
    }
    get client() {
        return this._client;
    }
}
exports.Yoru = Yoru;
