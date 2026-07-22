import { createI18n } from 'vue-i18n';
import uz from './locales/uz.json';
import ru from './locales/ru.json';

export const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('peony_locale') || 'uz',
  fallbackLocale: 'uz',
  messages: { uz, ru },
});
