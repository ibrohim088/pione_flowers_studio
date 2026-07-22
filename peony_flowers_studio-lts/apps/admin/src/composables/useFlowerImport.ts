import { ref } from 'vue';
import { api } from '../lib/api';

export interface FlowerSearchResultItem {
  externalId: number;
  commonName: string;
  scientificName: string[];
  thumbnail: string | null;
}

export interface FlowerDetailResult {
  externalId: number;
  title: string;
  description: string;
  images: string[];
  suggestedType: 'Flower' | 'Bouquet';
  meta: {
    family: string | null;
    watering: string | null;
    sunlight: string[];
    cycle: string | null;
  };
}

export function useFlowerImport() {
  const results = ref<FlowerSearchResultItem[]>([]);
  const isSearching = ref(false);
  const isLoadingDetail = ref(false);
  const error = ref<string | null>(null);

  async function search(query: string) {
    error.value = null;
    isSearching.value = true;
    try {
      const { data } = await api.get('/admin/flower-import/search', { params: { q: query } });
      results.value = data.data.items;
    } catch (err: any) {
      error.value = err?.response?.data?.message || 'Qidirishda xatolik yuz berdi';
      results.value = [];
    } finally {
      isSearching.value = false;
    }
  }

  async function getDetail(externalId: number): Promise<FlowerDetailResult | null> {
    error.value = null;
    isLoadingDetail.value = true;
    try {
      const { data } = await api.get(`/admin/flower-import/${externalId}`);
      return data.data;
    } catch (err: any) {
      error.value = err?.response?.data?.message || "Ma'lumotni olishda xatolik yuz berdi";
      return null;
    } finally {
      isLoadingDetail.value = false;
    }
  }

  return { results, isSearching, isLoadingDetail, error, search, getDetail };
}
