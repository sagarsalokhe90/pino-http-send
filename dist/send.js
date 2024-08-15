"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.createBody = void 0;
const got_1 = __importDefault(require("got"));
const args_1 = require("./args");
const log_1 = require("./log");
function createBody(logs, bodyType) {
    if (bodyType === 'ndjson') {
        return {
            body: logs.reduce((body, log) => (body += `${JSON.stringify(log)}\n`), ''),
        };
    }
    // default is json
    return { json: { logs } };
}
exports.createBody = createBody;
function send(logs, numRetries = 0) {
    const { url, method, username, password, headers = {}, bodyType = 'json', retries = 5, interval = 1000, silent = false, agent = undefined } = args_1.args;
    const limitHit = numRetries === retries;
    // fire and forget so we don't await or anything
    got_1.default(url, {
        method: method,
        username,
        password,
        headers,
        allowGetBody: true,
        agent: {
            http: agent,
            https: agent
        },
        ...createBody(logs, bodyType),
    })
        .then()
        .catch(err => {
        if (!silent) {
            log_1.logError(err, limitHit ? null : `...retrying in ${interval}ms`);
        }
        if (limitHit) {
            if (!silent) {
                // make sure to stringify to get the whole thing, e.g. don't want
                // cutoffs on deep objects...
                log_1.logWarn(`max retries hit (${retries}). dropping logs:`, JSON.stringify(logs));
            }
            return;
        }
        numRetries++;
        setTimeout(() => send(logs, numRetries), interval);
    });
}
exports.send = send;
//# sourceMappingURL=send.js.map