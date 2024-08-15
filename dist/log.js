"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.logWarn = exports.logInfo = void 0;
const chalk_1 = __importDefault(require("chalk"));
const prefix = 'pino-http-send';
function logInfo(message, ...params) {
    console.log(chalk_1.default.green(`${prefix} - ${message}`, ...params));
}
exports.logInfo = logInfo;
function logWarn(message, ...params) {
    console.warn(chalk_1.default.yellow(`${prefix} - ${message}`, ...params));
}
exports.logWarn = logWarn;
function logError(message, ...params) {
    console.error(chalk_1.default.red(`${prefix} - ${message}`, ...params));
}
exports.logError = logError;
//# sourceMappingURL=log.js.map