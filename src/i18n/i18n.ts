import en from './en.json';
import es from './es.json';

export type Lang = 'en' | 'es';

const translations: Record<Lang, Record<string, string>> = { en, es };

/** Read stored preference, then fall back to browser language. */
export function detectLang(): Lang {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'es') return stored;
  }
  if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('es')) {
    return 'es';
  }
  return 'en';
}

/** Translate a key in the given (or current) language. */
export function t(key: string, lang?: Lang): string {
  const l = lang ?? detectLang();
  return translations[l][key] ?? key;
}

/**
 * Apply a language to the page:
 * - persists to localStorage
 * - updates <html lang>
 * - updates every [data-i18n] element's textContent
 * - updates every [data-i18n-href-en] / [data-i18n-href-es] element's href
 * - swaps CV download links ([data-cv-link])
 */
export function setLang(lang: Lang): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('lang', lang);
  }

  if (typeof document === 'undefined') return;

  document.documentElement.lang = lang;

  // Update text content
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n!;
    const value = translations[lang][key];
    if (value !== undefined) el.textContent = value;
  });

  // Update CV download links
  document.querySelectorAll<HTMLAnchorElement>('[data-cv-link]').forEach((el) => {
    el.href = `/cv-${lang}.pdf`;
  });

  // Highlight the active lang toggle button
  document.querySelectorAll<HTMLElement>('[data-lang-btn]').forEach((el) => {
    const btnLang = el.dataset.langBtn as Lang;
    el.classList.toggle('active-lang', btnLang === lang);
  });

  // Dispatch event for other components to react
  document.dispatchEvent(new CustomEvent<Lang>('langchange', { detail: lang }));
}
