import { Yoru } from "../../core";
import { YoruApiErrors } from "../../types";

export interface ClientConstructor {
    apiKey: string;
}

export interface DatabaseConstructor {
    yoru: Yoru;
    databaseId: string;
}

export interface TableConstructor {
    yoru: Yoru;
}

export type YoruApiErrorConstructor = {
    name: YoruApiErrors;
    code: number;
    cause: string;
}