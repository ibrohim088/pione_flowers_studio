import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { useAuthStore } from '../stores/authStore';

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' });
  }

  const allowedRoles = to.meta.roles as string[] | undefined;
  if (allowedRoles && authStore.user && !allowedRoles.includes(authStore.user.role)) {
    return next({ name: 'login' });
  }

  return next();
});
