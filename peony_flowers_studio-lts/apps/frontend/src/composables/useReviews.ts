import { ref } from 'vue';
import { api } from '../lib/api';

export function useReviews() {
  const reviews = ref<any[]>([]);
  const isLoading = ref(false);

  async function fetchByProduct(productId: string) {
    isLoading.value = true;
    try {
      const { data } = await api.get(`/products/${productId}/reviews`);
      reviews.value = data.data;
    } finally {
      isLoading.value = false;
    }
  }

  async function submitReview(productId: string, rating: number, comment?: string) {
    const { data } = await api.post(`/products/${productId}/reviews`, { rating, comment });
    reviews.value.unshift(data.data);
    return data.data;
  }

  return { reviews, isLoading, fetchByProduct, submitReview };
}
