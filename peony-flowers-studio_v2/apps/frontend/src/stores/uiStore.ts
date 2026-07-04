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


// import { defineStore } from 'pinia';

// type Locale = 'uz' | 'ru';
// type Theme = 'light' | 'dark';

// export const useUiStore = defineStore('ui', {
//   state: () => ({
//     locale: (localStorage.getItem('peony_locale') as Locale) || 'uz',
//     theme: (localStorage.getItem('peony_theme') as Theme) || 'light',
//   }),

//   actions: {
//     setLocale(locale: Locale) {
//       this.locale = locale;
//       localStorage.setItem('peony_locale', locale);
//     },
//     setTheme(theme: Theme) {
//       this.theme = theme;
//       localStorage.setItem('peony_theme', theme);
//       document.documentElement.dataset.theme = theme;
//     },
//     toggleTheme() {
//       this.setTheme(this.theme === 'light' ? 'dark' : 'light');
//     },
//   },
// });
