/** Host registration for the browser theme preference and pre-plugin palette. */
import type { Context } from '@deepseek-ai/cordis';
export { DEFAULT_PREFERENCE, THEME_PREFERENCE_FIELD, THEME_PREFERENCES, THEME_SETTINGS_NAMESPACE, type ThemePreference, type ThemeSettings, } from './theme-settings.ts';
/**
 * Register the durable theme section when the optional settings service is
 * composed, and answer every index injection collection with the current
 * theme bootstrap row.
 * @param ctx - Host context that may acquire the settings service.
 */
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map