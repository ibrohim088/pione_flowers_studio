import { useWishlistStore } from '../stores/wishlistStore';

export function useWishlist() {
  const store = useWishlistStore();
  return {
    productIds: store.productIds,
    toggle: store.toggle,
    isInWishlist: store.isInWishlist,
  };
}
