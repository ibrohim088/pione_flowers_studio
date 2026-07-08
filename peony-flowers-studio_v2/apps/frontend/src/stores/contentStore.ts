import { defineStore } from 'pinia';
import { api } from '../lib/api';

export interface AboutContent {
  title: string;
  intro: string;
  foundedYear?: number;
  customersCount?: number;
  services: string[];
  values: string[];
  address?: string;
  lat?: number;
  lng?: number;
}

interface ContentState {
  // key -> locale -> content
  cache: Record<string, Record<string, unknown>>;
  loadingKeys: Record<string, boolean>;
}

export const useContentStore = defineStore('content', {
  state: (): ContentState => ({
    cache: {},
    loadingKeys: {},
  }),

  actions: {
    // Backenddan `key` bo'yicha kontentni (joriy tilda) oladi va keshlaydi. Bir xil key+locale uchun qayta so'rov yubormaydi.
    async fetchContent<T = unknown>(key: string, locale: string): Promise<T | null> {
      const cacheKey = `${key}:${locale}`;
      if (this.cache[cacheKey]) return this.cache[cacheKey] as T;

      this.loadingKeys[cacheKey] = true;
      try {
        const { data } = await api.get(`/content/${key}`, { params: { locale } });
        this.cache[cacheKey] = data.data;
        return data.data as T;
      } catch {
        return null;
      } finally {
        this.loadingKeys[cacheKey] = false;
      }
    },

    isLoading(key: string, locale: string) {
      return !!this.loadingKeys[`${key}:${locale}`];
    },
  },
});



// import { defineStore } from 'pinia';
// import { api } from '../lib/api';

// export interface AboutContent {
//   title: string;
//   intro: string;
//   foundedYear?: number;
//   customersCount?: number;
//   services: string[];
//   values: string[];
// }

// interface ContentState {
//   // key -> locale -> content
//   cache: Record<string, Record<string, unknown>>;
//   loadingKeys: Record<string, boolean>;
// }

// export const useContentStore = defineStore('content', {
//   state: (): ContentState => ({
//     cache: {},
//     loadingKeys: {},
//   }),

//   actions: {
//     // Backenddan `key` bo'yicha kontentni (joriy tilda) oladi va keshlaydi. Bir xil key+locale uchun qayta so'rov yubormaydi.
//     async fetchContent<T = unknown>(key: string, locale: string): Promise<T | null> {
//       const cacheKey = `${key}:${locale}`;
//       if (this.cache[cacheKey]) return this.cache[cacheKey] as T;

//       this.loadingKeys[cacheKey] = true;
//       try {
//         const { data } = await api.get(`/content/${key}`, { params: { locale } });
//         this.cache[cacheKey] = data.data;
//         return data.data as T;
//       } catch {
//         return null;
//       } finally {
//         this.loadingKeys[cacheKey] = false;
//       }
//     },

//     isLoading(key: string, locale: string) {
//       return !!this.loadingKeys[`${key}:${locale}`];
//     },
//   },
// });
