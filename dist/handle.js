"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLog = void 0;
const args_1 = require("./args");
const send_1 = require("./send");
let batch = [];
let timeoutId;
/**
 * Sends the batch and then clears it.
 */
function sendAndClear() {
    send_1.send([...batch]);
    batch = [];
}
/**
 * Handles a log in the stream pipeline. It manages a timeout to "flush" logs
 * that haven't filled up the batch size to send.
 * @param log
 * @param callback
 */
function handleLog(log, callback) {
    clearTimeout(timeoutId);
    batch.push(log);
    if (batch.length === args_1.args.batchSize) {
        sendAndClear();
        callback === null || callback === void 0 ? void 0 : callback();
    }
    else {
        timeoutId = setTimeout(sendAndClear, args_1.args.timeout);
        callback === null || callback === void 0 ? void 0 : callback();
    }
}
exports.handleLog = handleLog;
//# sourceMappingURL=handle.js.map