export declare type BodyType = 'json' | 'ndjson';
export declare type Body = {
    body?: string;
    json?: {
        logs: unknown;
    };
};
export declare function createBody(logs: Record<string, unknown>[], bodyType: BodyType): Body;
export declare function send(logs: Record<string, unknown>[], numRetries?: number): void;
