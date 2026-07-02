export interface UpdateUserInput {
  fullName?: string;
  email?: string;
}

export interface AdminUpdateUserInput extends UpdateUserInput {
  role?: 'customer' | 'florist' | 'courier' | 'admin';
  isActive?: boolean;
}
