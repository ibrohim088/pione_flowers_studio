import type { RouteRecordRaw } from 'vue-router';
import AdminLayout from '../components/layout/AdminLayout.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/LoginView.vue'),
  },
  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', name: 'dashboard', component: () => import('../views/dashboard/DashboardView.vue'), meta: { roles: ['admin'] } },
      { path: 'products', name: 'products', component: () => import('../views/products/ProductsListView.vue'), meta: { roles: ['admin'] } },
      { path: 'categories', name: 'categories', component: () => import('../views/categories/CategoriesView.vue'), meta: { roles: ['admin'] } },
      { path: 'orders', name: 'orders', component: () => import('../views/orders/OrdersListView.vue'), meta: { roles: ['admin'] } },
      { path: 'orders/:id', name: 'order-detail', component: () => import('../views/orders/OrderDetailView.vue'), meta: { roles: ['admin'] } },
      { path: 'users', name: 'users', component: () => import('../views/users/UsersListView.vue'), meta: { roles: ['admin'] } },
      { path: 'payments', name: 'payments', component: () => import('../views/payments/PaymentsView.vue'), meta: { roles: ['admin'] } },
      { path: 'content', name: 'content', component: () => import('../views/content/SiteContentView.vue'), meta: { roles: ['admin'] } },
      { path: 'newsletter', name: 'newsletter', component: () => import('../views/newsletter/SubscribersView.vue'), meta: { roles: ['admin'] } },
      { path: 'florist/queue', name: 'florist-queue', component: () => import('../views/florist/FloristQueueView.vue'), meta: { roles: ['florist', 'admin'] } },
      { path: 'courier/today', name: 'courier-today', component: () => import('../views/courier/CourierTodayView.vue'), meta: { roles: ['courier', 'admin'] } },
    ],
  },
];
