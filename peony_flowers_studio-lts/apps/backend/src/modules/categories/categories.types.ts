export interface CreateCategoryInput {
  name: string;
  imageUrl?: string;
  order?: number;
}

export interface UpdateCategoryInput extends Partial<CreateCategoryInput> {
  isActive?: boolean;
}
