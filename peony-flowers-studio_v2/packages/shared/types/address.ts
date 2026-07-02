export interface Address {
  id: string;
  userId: string;
  label?: string | null;
  city: string;
  district?: string | null;
  street: string;
  house?: string | null;
  entrance?: string | null;
  floor?: string | null;
  apartment?: string | null;
  landmark?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  isDefault: boolean;
}
