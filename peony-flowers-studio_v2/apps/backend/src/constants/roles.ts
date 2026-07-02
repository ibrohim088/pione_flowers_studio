export const ROLES = ['customer', 'florist', 'courier', 'admin'] as const;
export type Role = (typeof ROLES)[number];
