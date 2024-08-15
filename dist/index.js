"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWriteStream = void 0;
const pumpify_1 = __importDefault(require("pumpify"));
const split2_1 = __importDefault(require("split2"));
const through2_1 = __importDefault(require("through2"));
const args_1 = require("./args");
const handle_1 = require("./handle");
/**
 * Safely parses incoming JSON and logs the source if an error is thrown.
 * @param src
 */
function safeParse(src) {
    try {
        const parsed = JSON.parse(src);
        return parsed;
    }
    catch (e) {
        console.log(src);
    }
}
/**
 * Passes the incoming stream through the proper callback.
 * @param args
 */
function streamHandler() {
    return through2_1.default.obj((log, _enc, callback) => {
        handle_1.handleLog(log, callback);
    });
}
/**
 * Creates a writable stream that handles logs, batches them, and then sends
 * them to the configured endpoint.
 * @param options
 */
function createWriteStream(args) {
    // make sure url is defined right away
    if (!args.url || !args.url.trim()) {
        throw new Error('args.url is required');
    }
    args_1.setArgs(args);
    return new pumpify_1.default(split2_1.default(safeParse), streamHandler());
}
exports.createWriteStream = createWriteStream;
//# sourceMappingURL=index.js.map