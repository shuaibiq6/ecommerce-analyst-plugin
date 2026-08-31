import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client';
/** Required services: the trigger registry, the Remote namespaces, and the copy. */
export declare const inject: string[];
/**
 * Register the combined `@file` / `@session` source.
 * @param ctx - client root context.
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map