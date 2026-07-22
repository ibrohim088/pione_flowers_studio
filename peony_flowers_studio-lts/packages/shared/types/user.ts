export type Role = 'customer' | 'florist' | 'courier' | 'admin';

export interface User {
  id: string;
  phone: string;
  fullName?: string | null;
  email?: string | null;
  role: Role;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
