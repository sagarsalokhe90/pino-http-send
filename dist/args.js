"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setArgs = exports.loadArgs = exports.args = void 0;
const fs_1 = require("fs");
const yargs_1 = __importDefault(require("yargs"));
/**
 * Used with API and not with CLI...
 */
const defaultArgs = {
    log: false,
    silent: true,
    method: 'POST',
    bodyType: 'json',
    url: '',
    batchSize: 10,
    retries: 5,
    interval: 1000,
    timeout: 5000,
};
/**
 * On demand loading of args since CLI would conflict with the loading of these.
 */
function loadArgs() {
    exports.args = yargs_1.default
        .usage('pino-http-send [options]')
        .env('PINO_HTTP_SEND')
        .option('log', {
        alias: 'l',
        type: 'boolean',
        desc: 'log to console as well',
        default: false,
    })
        .option('silent', {
        type: 'boolean',
        desc: 'silence pino-http-send logs for failures and retries',
        default: false,
    })
        .option('method', {
        alias: 'm',
        type: 'string',
        choices: ['POST', 'PUT', 'PATCH', 'GET'],
        group: 'Sending',
        default: 'POST',
    })
        .option('bodyType', {
        alias: 'b',
        type: 'string',
        choices: ['json', 'ndjson'],
        desc: 'type of body to send',
        group: 'Sending',
        default: 'json',
    })
        .option('url', {
        type: 'string',
        require: true,
        group: 'Sending',
        desc: 'url to send logs to',
    })
        .option('username', {
        alias: 'u',
        type: 'string',
        desc: 'basic auth username',
        group: 'Basic Auth',
    })
        .option('password', {
        alias: 'p',
        type: 'string',
        desc: 'basic auth password',
        group: 'Basic Auth',
    })
        .option('batchSize', {
        alias: 's',
        type: 'number',
        desc: 'how many logs to send at a time',
        group: 'Sending',
        default: 10,
    })
        .option('retries', {
        alias: 'r',
        type: 'number',
        desc: 'number of retries to do if failure',
        group: 'Retry',
        default: 5,
    })
        .option('interval', {
        alias: 'i',
        type: 'number',
        desc: 'interval (in ms) to retry sending if failure',
        group: 'Retry',
        default: 1000,
    })
        .option('timeout', {
        alias: 't',
        type: 'number',
        desc: 'timeout (in ms) to send logs in bucket that are not filled',
        group: 'Sending',
        default: 5000,
    })
        .option('config', {
        alias: 'c',
        type: 'string',
        desc: 'path to json config',
        config: true,
        configParser: path => JSON.parse(fs_1.readFileSync(path, 'utf8')),
    })
        .parse();
    return exports.args;
}
exports.loadArgs = loadArgs;
/**
 * Sets args to passed in values defaulting to above defaults.
 * Used in CLI ONLY.
 * @param newArgs
 */
function setArgs(newArgs) {
    exports.args = {
        ...defaultArgs,
        ...newArgs,
    };
}
exports.setArgs = setArgs;
//# sourceMappingURL=args.js.map