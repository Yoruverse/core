import { YoruApiErrorConstructor } from "../../../types";

export class YoruError extends Error {

    public code: number;
    public cause: string;

    constructor(constructor: YoruApiErrorConstructor) {
        super(constructor.cause);
        this.name = constructor.name;
        this.code = constructor.code;
        this.cause = constructor.cause;
        this.name = constructor.name;
        this.stack = new Error().stack;
    }

}