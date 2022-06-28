import i18n from 'i18n-js';
import en from './en';
import vi from './vi';

i18n.fallbacks = true;
i18n.translations = { en, vi };

i18n.locale = 'en';
/**
 * Builds up valid keypaths for translations.
 * Update to your default locale of choice if not English.
 */
type DefaultLocale = typeof en;
export type I18Key = RecursiveKeyOf<DefaultLocale>;

type RecursiveKeyOf<TObj extends Record<string, any>> = {
    [TKey in keyof TObj & string]: TObj[TKey] extends Record<string, any>
        ? `${TKey}` | `${TKey}.${RecursiveKeyOf<TObj[TKey]>}`
        : `${TKey}`;
}[keyof TObj & string];

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(
    key: I18Key,
    options?: i18n.TranslateOptions,
): string {
    return key ? i18n.t(key, options) : '';
}
