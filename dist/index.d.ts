import Pumpify from 'pumpify';
import { Args } from './args';
/**
 * Creates a writable stream that handles logs, batches them, and then sends
 * them to the configured endpoint.
 * @param options
 */
export declare function createWriteStream(args: Args): Pumpify;
