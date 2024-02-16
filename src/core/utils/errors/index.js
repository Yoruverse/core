"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoruError = void 0;
class YoruError extends Error {
    code;
    cause;
    constructor(constructor) {
        super(constructor.cause);
        this.name = constructor.name;
        this.code = constructor.code;
        this.cause = constructor.cause;
        this.name = constructor.name;
        this.stack = new Error().stack;
    }
}
exports.YoruError = YoruError;
