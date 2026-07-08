import { ref } from 'vue';
import { api } from '../lib/api';

export interface AboutContentLocale {
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

export interface AboutContentData {
  uz: AboutContentLocale;
  ru: AboutContentLocale;
}

const emptyLocale = (): AboutContentLocale => ({
  title: '',
  intro: '',
  foundedYear: undefined,
  customersCount: undefined,
  services: [],
  values: [],
  address: '',
  lat: undefined,
  lng: undefined,
});

export function useAdminContent(key: string) {
  const data = ref<AboutContentData>({ uz: emptyLocale(), ru: emptyLocale() });
  const isLoading = ref(false);
  const isSaving = ref(false);
  const notFoundYet = ref(false);

  async function fetchContent() {
    isLoading.value = true;
    notFoundYet.value = false;
    try {
      const { data: res } = await api.get(`/content/${key}/raw`);
      data.value = res.data.data as AboutContentData;
    } catch (err: any) {
      // Hali bazada yozuv yo'q bo'lsa — bo'sh forma bilan yaratishga ruxsat beramiz
      if (err?.response?.status === 404) {
        notFoundYet.value = true;
      } else {
        throw err;
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function save() {
    isSaving.value = true;
    try {
      const { data: res } = await api.put(`/content/${key}`, { data: data.value });
      data.value = res.data.data as AboutContentData;
      notFoundYet.value = false;
      return res.data;
    } finally {
      isSaving.value = false;
    }
  }

  return { data, isLoading, isSaving, notFoundYet, fetchContent, save };
}



// import { ref } from 'vue';
// import { api } from '../lib/api';

// export interface AboutContentLocale {
//   title: string;
//   intro: string;
//   foundedYear?: number;
//   customersCount?: number;
//   services: string[];
//   values: string[];
// }

// export interface AboutContentData {
//   uz: AboutContentLocale;
//   ru: AboutContentLocale;
// }

// const emptyLocale = (): AboutContentLocale => ({
//   title: '',
//   intro: '',
//   foundedYear: undefined,
//   customersCount: undefined,
//   services: [],
//   values: [],
// });

// export function useAdminContent(key: string) {
//   const data = ref<AboutContentData>({ uz: emptyLocale(), ru: emptyLocale() });
//   const isLoading = ref(false);
//   const isSaving = ref(false);
//   const notFoundYet = ref(false);

//   async function fetchContent() {
//     isLoading.value = true;
//     notFoundYet.value = false;
//     try {
//       const { data: res } = await api.get(`/content/${key}/raw`);
//       data.value = res.data.data as AboutContentData;
//     } catch (err: any) {
//       // Hali bazada yozuv yo'q bo'lsa — bo'sh forma bilan yaratishga ruxsat beramiz
//       if (err?.response?.status === 404) {
//         notFoundYet.value = true;
//       } else {
//         throw err;
//       }
//     } finally {
//       isLoading.value = false;
//     }
//   }

//   async function save() {
//     isSaving.value = true;
//     try {
//       const { data: res } = await api.put(`/content/${key}`, { data: data.value });
//       data.value = res.data.data as AboutContentData;
//       notFoundYet.value = false;
//       return res.data;
//     } finally {
//       isSaving.value = false;
//     }
//   }

//   return { data, isLoading, isSaving, notFoundYet, fetchContent, save };
// }
