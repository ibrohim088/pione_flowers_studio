export interface CreateAddressInput {
  label?: string;
  city: string;
  district?: string;
  street: string;
  house?: string;
  entrance?: string;
  floor?: string;
  apartment?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export type UpdateAddressInput = Partial<CreateAddressInput>;
