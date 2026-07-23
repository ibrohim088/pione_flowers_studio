export interface CreateCategoryInput {
  nameUz: string;
  nameRu?: string;
  imageUrl?: string;
  order?: number;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  isActive?: boolean;
}