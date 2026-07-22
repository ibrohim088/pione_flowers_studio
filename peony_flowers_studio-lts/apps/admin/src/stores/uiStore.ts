import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    theme: 'dark' as 'light' | 'dark',
    sidebarCollapsed: false,
  }),
  actions: {
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
  },
});
