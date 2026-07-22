import axios from 'axios';
import { env } from '../../config/env';
import { AppError } from '../../middleware/errorHandler';
import { FlowerDetailResult, FlowerSearchResponse } from './flowerImport.types';

// Vaqtinchalik integratsiya: Perenual (https://perenual.com/docs/api) ochiq bitanik API.
// Xohlasangiz RapidAPI orqali ham foydalanish mumkin — shunchaki BASE_URL va headerlarni
// shu faylda o'zgartirsangiz kifoya, boshqa joyga tegmaydi.
const BASE_URL = 'https://perenual.com/api/v2';

function getApiKey(): string {
  if (!env.PERENUAL_API_KEY) {
    throw new AppError(
      "Gullar importi uchun API kalit sozlanmagan (PERENUAL_API_KEY). Backend .env fayliga qo'shing.",
      500
    );
  }
  return env.PERENUAL_API_KEY;
}

interface PerenualListItem {
  id: number;
  common_name: string | null;
  scientific_name?: string[];
  default_image?: { thumbnail?: string | null; original_url?: string | null } | null;
}

interface PerenualListResponse {
  data: PerenualListItem[];
  current_page: number;
  last_page: number;
}

interface PerenualDetail {
  id: number;
  common_name: string | null;
  scientific_name?: string[];
  family?: string | null;
  type?: string | null;
  cycle?: string | null;
  watering?: string | null;
  sunlight?: string[];
  description?: string | null;
  default_image?: { original_url?: string | null; thumbnail?: string | null } | null;
}

export const flowerImportService = {
  async search(query: string, page = 1): Promise<FlowerSearchResponse> {
    if (!query || query.trim().length < 2) {
      throw new AppError('Qidiruv so\'zi kamida 2 ta harf bo\'lishi kerak', 400);
    }

    const { data } = await axios.get<PerenualListResponse>(`${BASE_URL}/species-list`, {
      params: { key: getApiKey(), q: query.trim(), page },
    });

    return {
      items: (data.data || []).map((item) => ({
        externalId: item.id,
        commonName: item.common_name || 'Nomsiz',
        scientificName: item.scientific_name || [],
        thumbnail: item.default_image?.thumbnail || item.default_image?.original_url || null,
      })),
      page: data.current_page,
      totalPages: data.last_page,
    };
  },

  async getDetail(externalId: number): Promise<FlowerDetailResult> {
    const { data } = await axios.get<PerenualDetail>(`${BASE_URL}/species/details/${externalId}`, {
      params: { key: getApiKey() },
    });

    if (!data || !data.id) {
      throw new AppError('Gul topilmadi', 404);
    }

    const scientific = data.scientific_name?.join(', ') || '';
    const description =
      data.description?.trim() ||
      `${data.common_name || 'Gul'}${scientific ? ` (${scientific})` : ''}. ` +
        `Oila: ${data.family || 'nomalum'}. Parvarish: ${data.watering || 'nomalum'} sug'orish, ` +
        `${(data.sunlight || []).join(', ') || 'nomalum'} yorug'lik talab qiladi.`;

    const image = data.default_image?.original_url || data.default_image?.thumbnail;

    return {
      externalId: data.id,
      title: data.common_name || 'Nomsiz gul',
      description,
      images: image ? [image] : [],
      suggestedType: /bouquet|bunch/i.test(data.type || '') ? 'Bouquet' : 'Flower',
      meta: {
        family: data.family || null,
        watering: data.watering || null,
        sunlight: data.sunlight || [],
        cycle: data.cycle || null,
      },
    };
  },
};
