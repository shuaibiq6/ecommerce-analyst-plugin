/** `reference` namespace dictionaries for the unified `@` source. */
/** Dictionary namespace owned by this plugin. */
export declare const NS = "reference";
/** Simplified Chinese dictionary (the key-set source of truth). */
export declare const zh: {
    'section.files': string;
    'section.sessions': string;
    'candidate.file': string;
    'candidate.folder': string;
    'candidate.session': string;
    'candidate.noCwd': string;
};
/** The reference namespace key union. */
export type ReferenceKey = keyof typeof zh;
declare module '@deepseek-ai/dsh-client-ui-slots' {
    interface LocaleNamespaceMap {
        /** The unified `@` reference menu's copy. */
        reference: ReferenceKey;
    }
}
/** English dictionary, checked complete against the zh key set. */
export declare const en: {
    'section.files': string;
    'section.sessions': string;
    'candidate.file': string;
    'candidate.folder': string;
    'candidate.session': string;
    'candidate.noCwd': string;
};
//# sourceMappingURL=locales.d.ts.map