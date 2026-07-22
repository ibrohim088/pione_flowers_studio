// Tashqi API (Perenual)'dan qaytadigan xom javobni to'liq typelamaymiz —
// faqat bizga kerakli maydonlarni olamiz, qolganini "unknown" sifatida saqlaymiz.

export interface FlowerSearchResultItem {
  externalId: number;
  commonName: string;
  scientificName: string[];
  thumbnail: string | null;
}

export interface FlowerSearchResponse {
  items: FlowerSearchResultItem[];
  page: number;
  totalPages: number;
}

// Admin panelidagi "Mahsulot yaratish" formasiga to'g'ridan-to'g'ri mos keladigan shakl.
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
