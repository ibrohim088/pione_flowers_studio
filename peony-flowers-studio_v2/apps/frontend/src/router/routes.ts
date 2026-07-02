import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/public/HomeView.vue'),
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('../views/public/CatalogView.vue'),
  },
  {
    path: '/product/:slug',
    name: 'product-detail',
    component: () => import('../views/public/ProductDetailView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/public/AboutView.vue'),
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/public/CartView.vue'),
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('../views/public/CheckoutView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/RegisterView.vue'),
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('../views/account/AccountOverviewView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account/profile',
    name: 'account-profile',
    component: () => import('../views/account/PersonalInfoView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account/orders',
    name: 'account-orders',
    component: () => import('../views/account/OrdersView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account/orders/:id',
    name: 'account-order-detail',
    component: () => import('../views/account/OrderDetailView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account/addresses',
    name: 'account-addresses',
    component: () => import('../views/account/AddressesView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account/wishlist',
    name: 'account-wishlist',
    component: () => import('../views/account/WishlistView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/account/notifications',
    name: 'account-notifications',
    component: () => import('../views/account/NotificationsView.vue'),
    meta: { requiresAuth: true },
  },
];
