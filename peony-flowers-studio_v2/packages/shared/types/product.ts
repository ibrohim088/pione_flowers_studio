export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  order: number;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  order: number;
}

export interface Product {
  id: string;
  categoryId: string;
  category?: Category;
  title: string;
  slug: string;
  description?: string | null;
  type: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  isActive: boolean;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}
