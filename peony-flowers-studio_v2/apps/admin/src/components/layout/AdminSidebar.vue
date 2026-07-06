<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import {
  CreditCard,
  Flower,
  Flower2,
  FolderTree,
  LayoutDashboard,
  Package,
  Ticket,
  Truck,
  Users,
} from '@lucide/vue';
import { useAuthStore } from '../../stores/authStore';
import logo from '../../assets/images/favicons_gold.svg'


const authStore = useAuthStore();

const links = computed(() => {
  if (authStore.isFlorist) {
    return [{ to: '/florist/queue', label: 'Buyurtmalar navbati', icon: Flower }];
  }
  if (authStore.isCourier) {
    return [{ to: '/courier/today', label: 'Bugungi yetkazishlar', icon: Truck }];
  }
  return [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/products', label: 'Mahsulotlar', icon: Flower2 },
    { to: '/categories', label: 'Kategoriyalar', icon: FolderTree },
    { to: '/orders', label: 'Buyurtmalar', icon: Package },
    { to: '/users', label: 'Foydalanuvchilar', icon: Users },
    { to: '/coupons', label: 'Kuponlar', icon: Ticket },
    { to: '/payments', label: "To'lovlar", icon: CreditCard },
  ];
});
</script>

<template>
  <aside class="sidebar">
    <div class="logo">
      <img :src="logo" alt="Peony Logo" />
      <div class="logo-text">
        <strong>Peony Admin</strong>
        <span>Premium Florals</span>
      </div>
    </div>
    <nav>
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="link">
        <span class="icon">
          <component :is="link.icon" :size="18" />
        </span>
        {{ link.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 280px;
  flex-shrink: 0;
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.logo {
  display: flex;
  align-items: center;
  
  gap: 16px;
  padding: 0 8px;
}

.logo-badge {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--accent-dark);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;

  strong {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: var(--text-primary);
  }

  span {
    font-size: 11px;
    color: var(--text-secondary);
  }
}

nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: var(--radius-full);
  color: var(--text-secondary);
  font-size: 14px;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background: var(--bg-primary);
    color: var(--text-primary);
  }

  &.router-link-active {
    background: var(--accent-light);
    color: var(--accent-dark);
    font-weight: 500;
  }
}

.icon {
  display: flex;
  align-items: center;
}
</style>


<!-- <script setup lang="ts">
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import {
  CreditCard,
  Flower,
  Flower2,
  FolderTree,
  LayoutDashboard,
  Package,
  Ticket,
  Truck,
  Users,
} from '@lucide/vue';
import { useAuthStore } from '../../stores/authStore';

const authStore = useAuthStore();

const links = computed(() => {
  if (authStore.isFlorist) {
    return [{ to: '/florist/queue', label: 'Buyurtmalar navbati', icon: Flower }];
  }
  if (authStore.isCourier) {
    return [{ to: '/courier/today', label: 'Bugungi yetkazishlar', icon: Truck }];
  }
  return [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/products', label: 'Mahsulotlar', icon: Flower2 },
    { to: '/categories', label: 'Kategoriyalar', icon: FolderTree },
    { to: '/orders', label: 'Buyurtmalar', icon: Package },
    { to: '/users', label: 'Foydalanuvchilar', icon: Users },
    { to: '/coupons', label: 'Kuponlar', icon: Ticket },
    { to: '/payments', label: "To'lovlar", icon: CreditCard },
  ];
});
</script>

<template>
  <aside class="sidebar">
    <div class="logo"><Flower2 :size="22" /> Peony Admin</div>
    <nav>
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="link">
        <span class="icon"><component :is="link.icon" :size="18" /></span>
        {{ link.label }}
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  width: 240px;
  background: var(--bg-sidebar);
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.logo {
  display: flex; align-items: center; gap: 8px;
  font-weight: 700; font-size: 18px; padding: 0 12px; color: var(--accent);
}
nav { display: flex; flex-direction: column; gap: 4px; }
.link {
  display: flex; align-items: center; gap: 10px;
  padding: 10px 12px;
  border-radius: var(--radius);
  color: var(--text-secondary);
  &.router-link-active { background: var(--accent-light); color: var(--accent); }
}
.icon { display: flex; align-items: center; }
</style> -->
