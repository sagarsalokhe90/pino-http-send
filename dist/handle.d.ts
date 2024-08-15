import { TransformCallback } from 'through2';
/**
 * Handles a log in the stream pipeline. It manages a timeout to "flush" logs
 * that haven't filled up the batch size to send.
 * @param log
 * @param callback
 */
export declare function handleLog(log: Record<string, unknown>, callback?: TransformCallback): void;
