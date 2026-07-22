import { ref, watch } from 'vue';
import { api } from '../lib/api';
import { i18n } from '../i18n';

export function useProduct() {
  const product = ref<any | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  let currentSlug: string | null = null;

  async function fetchBySlug(slug: string) {
    currentSlug = slug;
    isLoading.value = true;
    error.value = null;
    try {
      const { data } = await api.get(`/products/${slug}`);
      product.value = data.data;
    } catch (err: any) {
      error.value = err.response?.data?.message ?? 'Mahsulot topilmadi';
    } finally {
      isLoading.value = false;
    }
  }

  // Til (uz/ru) almashtirilganda x-locale header o'zgaradi, shuning uchun
  // mahsulotni shu tilda qayta yuklab, sarlavha/tavsifni yangilaymiz.
  watch(
    () => i18n.global.locale.value,
    () => {
      if (currentSlug) fetchBySlug(currentSlug);
    }
  );

  return { product, isLoading, error, fetchBySlug };
}
