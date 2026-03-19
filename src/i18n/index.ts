import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import zh from './locales/zh.json';

type TranslationKeys = typeof en;
type Locale = 'en' | 'fr' | 'de' | 'zh' | 'es' | 'ja';

const translations: Record<string, TranslationKeys> = {
  en,
  fr: fr as unknown as TranslationKeys,
  de: de as unknown as TranslationKeys,
  zh: zh as unknown as TranslationKeys,
};

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === 'string' ? current : path;
}

export function t(key: string, locale: string = 'en'): string {
  const dict = translations[locale] || translations.en;
  const result = getNestedValue(dict as unknown as Record<string, unknown>, key);
  if (result === key && locale !== 'en') {
    return getNestedValue(translations.en as unknown as Record<string, unknown>, key);
  }
  return result;
}

export function getLocale(url: URL): Locale {
  const [, maybeLang] = url.pathname.split('/');
  const supportedLocales: Locale[] = ['en', 'fr', 'de', 'zh', 'es', 'ja'];
  if (supportedLocales.includes(maybeLang as Locale)) {
    return maybeLang as Locale;
  }
  return 'en';
}

export function getLocalizedPath(path: string, locale: string): string {
  if (locale === 'en') return path;
  return `/${locale}${path}`;
}

export const supportedLocales: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: 'GB' },
  { code: 'fr', label: 'Fran\u00e7ais', flag: 'FR' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'zh', label: '\u4e2d\u6587', flag: 'CN' },
  { code: 'es', label: 'Espa\u00f1ol', flag: 'ES' },
  { code: 'ja', label: '\u65e5\u672c\u8a9e', flag: 'JP' },
];
