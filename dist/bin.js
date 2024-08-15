#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pump_1 = __importDefault(require("pump"));
const split2_1 = __importDefault(require("split2"));
const through2_1 = __importDefault(require("through2"));
const args_1 = require("./args");
const handle_1 = require("./handle");
args_1.loadArgs();
function safeParse(src) {
    try {
        const parsed = JSON.parse(src);
        if (args_1.args.log) {
            console.log(src);
        }
        return parsed;
    }
    catch (e) {
        if (args_1.args.log) {
            console.log(src);
        }
    }
}
const transport = through2_1.default.obj((log, _enc, callback) => {
    handle_1.handleLog(log, callback);
});
pump_1.default(process.stdin, split2_1.default(safeParse), transport);
//# sourceMappingURL=bin.js.map