/// <reference types="node" />
import * as https from 'https';
export declare type Args = {
    url: string;
    log?: boolean;
    silent?: boolean;
    method?: string;
    bodyType?: string;
    username?: string;
    password?: string;
    headers?: Record<string, string>;
    batchSize?: number;
    retries?: number;
    interval?: number;
    timeout?: number;
    config?: string;
    agent?: https.Agent;
};
export declare let args: Args;
/**
 * On demand loading of args since CLI would conflict with the loading of these.
 */
export declare function loadArgs(): Args;
/**
 * Sets args to passed in values defaulting to above defaults.
 * Used in CLI ONLY.
 * @param newArgs
 */
export declare function setArgs(newArgs: Partial<Args>): void;
