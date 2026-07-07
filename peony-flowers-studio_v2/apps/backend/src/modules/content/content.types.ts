export type ContentLocale = 'uz' | 'ru';

/**
 * "about" kaliti uchun ma'lumot strukturasi.
 * Kelajakda boshqa kalitlar (masalan "delivery", "paymentMethods") qo'shilsa,
 * ular uchun alohida interfeys qo'shib, LocalizedContent<T> orqali qayta ishlatish mumkin.
 */
export interface AboutContent {
  title: string;
  intro: string;
  foundedYear?: number;
  customersCount?: number;
  services: string[];
  values: string[];
}

export type LocalizedContent<T> = Record<ContentLocale, T>;

export interface SiteContentDto {
  key: string;
  data: Record<string, unknown>;
  updatedAt: Date;
}
