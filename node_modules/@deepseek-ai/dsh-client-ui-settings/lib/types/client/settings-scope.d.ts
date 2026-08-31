/**
 * Host transport for the settings-namespace scope contract. The contract types
 * live in `dsh-client-runtime` (the common dependency of every feature that
 * owns a preference); this file owns the per-namespace derivation over the
 * shared {@link SettingsDescribeMirror} and the serialized write path, both of
 * which are Settings-surface concerns. Reads never touch the wire here: the
 * mirror is the one `settings.describe` reader, and every scope is a selector
 * over its snapshot.
 */
import { Service } from '@deepseek-ai/cordis';
import type { Context } from '@deepseek-ai/cordis';
import type { IApiClient } from '@deepseek-ai/dsh-api-remotes/client';
import { type SettingsScope, type SettingsScopeSnapshot, type SettingsScopeSpec } from '@deepseek-ai/dsh-client-runtime/client';
import type { SettingsSchemaService } from './schema.ts';
import { SettingsDescribeMirror, type SettingsDescribeFace } from './settings-mirror.ts';
type SettingsFace = Pick<IApiClient, 'settings'>;
/**
 * One namespace's derived view over the shared describe mirror, plus that
 * namespace's serialized Host writes. Writes carry the latest known namespace
 * revision, fold their answers back into the mirror, and teardown waits for
 * the operation already crossing the wire.
 */
export declare class SettingsScopeController<T> implements SettingsScope<T> {
    private readonly api;
    private readonly spec;
    private readonly mirror;
    private readonly persistence;
    private readonly schema;
    private readonly store;
    private tail;
    private writeGeneration;
    private disposed;
    private readonly unsubscribe;
    /**
     * Revision answered by a superseded write still ahead of the mirror: the
     * mirror only folds the LATEST settlement in, so a queued successor takes
     * its fence from here first.
     */
    private pendingRevision;
    /**
     * @param api - settings wire face (writes only; reads ride the mirror).
     * @param spec - namespace identity and optional narrowing decoder.
     * @param mirror - the shared describe mirror this scope derives from.
     * @param persistence - remote browsers remain process-local because settings RPCs are loopback-only.
     * @param schema - settings-owned schema operations.
     */
    constructor(api: SettingsFace, spec: SettingsScopeSpec<T>, mirror: SettingsDescribeMirror, persistence: 'host' | 'memory', schema: SettingsSchemaService);
    /** @returns the current sync snapshot (stable reference until the next change). */
    getSnapshot(): SettingsScopeSnapshot<T>;
    /**
     * Observe snapshot replacements.
     * @param listener - invoked after each snapshot change.
     * @returns the disposer removing this listener.
     */
    subscribe(listener: () => void): () => void;
    /**
     * Queue one field write; see {@link SettingsScope.set} for the ordering,
     * revision, and recovery contract.
     * @param field - scalar field inside the namespace section.
     * @param value - JSON-shaped value selected by the user.
     * @returns settlement after the write and any latest-write recovery read.
     */
    set(field: string, value: unknown): Promise<void>;
    /**
     * Queue one field clear; see {@link SettingsScope.unset} for the ordering,
     * revision, and recovery contract.
     * @param field - scalar field inside the namespace section.
     * @returns settlement after the clear and any latest-write recovery read.
     */
    unset(field: string): Promise<void>;
    private write;
    /** Reload Host state for the latest failed write; superseded failures leave recovery to it. */
    private recover;
    /**
     * Stop queued operations, stop deriving, and wait for the current wire call
     * to settle.
     * @returns settlement after the controller reaches quiescence.
     */
    dispose(): Promise<void>;
    private enqueue;
    private derive;
    private decode;
}
declare module '@deepseek-ai/cordis' {
    interface Context {
        settingsScope: SettingsScopeBinder;
    }
}
/**
 * The settings domain's base service. Features that own a preference reach the
 * settings transport through this service rather than a shared function: the
 * client bundle purity gate forbids cross-plugin value imports and directs
 * cross-plugin collaboration through cordis services
 * (`packages/client/tsdown.client.ts`).
 */
export declare class SettingsScopeBinder extends Service {
    private readonly mirror;
    private readonly schema;
    /**
     * @param ctx - the providing plugin's context.
     * @param config - the shared describe mirror every bound scope derives from,
     * plus the settings-owned schema operations.
     */
    constructor(ctx: Context, config: {
        mirror: SettingsDescribeMirror;
        schema: SettingsSchemaService;
    });
    /**
     * The shared mirror's read/fold face for cross-namespace surfaces (schema
     * introspection, the served-namespace directory). Per-namespace consumers
     * use {@link bind}; both derive from the same snapshot, so they can never
     * disagree about the document.
     * @returns the describe face over the shared mirror.
     */
    describe(): SettingsDescribeFace;
    /**
     * Bind one namespace scope on the CALLER's plugin lifecycle — the service
     * proxy binds `this.ctx` to the caller at call time, so the scope's disposer
     * belongs to the calling fiber. The scope derives from the shared mirror
     * (whose invalidation subscriptions live with the providing plugin), so
     * binding adds no wire read of its own and activation never blocks on the
     * settings transport.
     * @param spec - domain-owned namespace contract.
     * @returns the bound scope consumed by the domain's services and rows.
     */
    bind<T>(spec: SettingsScopeSpec<T>): SettingsScope<T>;
}
export {};
//# sourceMappingURL=settings-scope.d.ts.map