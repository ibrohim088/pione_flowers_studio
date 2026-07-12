import { defineStore } from 'pinia';
import { i18n } from '../i18n';

type Locale = 'uz' | 'ru';

export const useUiStore = defineStore('ui', {
  state: () => ({
    locale: (localStorage.getItem('peony_locale') as Locale) || 'uz',
  }),

  actions: {
    setLocale(locale: Locale) {
      this.locale = locale;
      localStorage.setItem('peony_locale', locale);
      (i18n.global.locale as any).value = locale;
    },
  },
});