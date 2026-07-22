export interface CreateProductInput {
  categoryId: string;
  titleUz: string;
  titleRu?: string;
  descriptionUz?: string;
  descriptionRu?: string;
  type: string;
  price: number;
  discountPrice?: number;
  stock?: number;
  images?: string[];
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  isActive?: boolean;
}

export interface ProductFilterQuery {
  page?: string;
  limit?: string;
  categoryId?: string;
  type?: string;
  search?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: 'price_low' | 'price_high' | 'newest' | 'popular';
}
