import type { Directive } from 'vue';

/**
 * v-autofocus — element DOM'ga qo'shilganda avtomatik fokus beradi.
 *
 * Ishlatilishi:
 *   <input v-autofocus />
 *   <AppInput v-autofocus />  (agar component ichida fallthrough attribute
 *   input'ga tushsa; aks holda component ichidagi <input>'ga to'g'ridan-to'g'ri qo'ying)
 *
 * Shart (modifier) bilan ham ishlatish mumkin:
 *   <input v-autofocus="condition" />
 * condition false bo'lsa, fokus berilmaydi (masalan modal ochilmagan holatda).
 */
export const autofocus: Directive<HTMLElement, boolean | undefined> = {
  mounted(el, binding) {
    if (binding.value === false) return;

    const target = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement
      ? el
      : el.querySelector<HTMLInputElement | HTMLTextAreaElement>('input, textarea');

    // Modal/route transition tugagach fokus ishlashi uchun keyingi frame'da chaqiramiz
    requestAnimationFrame(() => target?.focus());
  },
};
