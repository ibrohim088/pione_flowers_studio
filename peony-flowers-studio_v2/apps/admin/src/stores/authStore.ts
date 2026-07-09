import { defineStore } from 'pinia';
import axios from 'axios';

interface AdminUser {
  id: string;
  phone: string;
  fullName?: string | null;
  email?: string | null;
  role: string;
}

const ALLOWED_ROLES = ['admin', 'florist', 'courier'];
const STORAGE_KEY = 'peony_admin_auth';

function readFromStorage(): { accessToken: string | null; user: AdminUser | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { accessToken: null, user: null };
    const parsed = JSON.parse(raw);
    return { accessToken: parsed.accessToken ?? null, user: parsed.user ?? null };
  } catch {
    return { accessToken: null, user: null };
  }
}

function writeToStorage(accessToken: string | null, user: AdminUser | null) {
  if (accessToken && user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, user }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => readFromStorage(),

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
    isAdmin: (state) => state.user?.role === 'admin',
    isFlorist: (state) => state.user?.role === 'florist',
    isCourier: (state) => state.user?.role === 'courier',
  },

  actions: {
    setUser(user: AdminUser) {
      this.user = user;
      writeToStorage(this.accessToken, this.user);
    },

    async sendOtp(phone: string) {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phone });
    },

    async verifyOtp(phone: string, code: string) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { phone, code },
        { withCredentials: true }
      );

      if (!ALLOWED_ROLES.includes(data.data.user.role)) {
        throw new Error('Bu panelga kirish huquqingiz yo\'q');
      }

      this.accessToken = data.data.accessToken;
      this.user = data.data.user;
      writeToStorage(this.accessToken, this.user);
    },

    async refreshAccessToken() {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {},
        { withCredentials: true }
      );
      this.accessToken = data.data.accessToken;
      writeToStorage(this.accessToken, this.user);
    },

    async logout() {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true });
      } finally {
        this.user = null;
        this.accessToken = null;
        writeToStorage(null, null);
      }
    },
  },
});



// import { defineStore } from 'pinia';
// import axios from 'axios';

// interface AdminUser {
//   id: string;
//   phone: string;
//   fullName?: string | null;
//   email?: string | null;
//   role: string;
// }

// const ALLOWED_ROLES = ['admin', 'florist', 'courier'];

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     user: null as AdminUser | null,
//     accessToken: null as string | null,
//   }),

//   getters: {
//     isAuthenticated: (state) => !!state.accessToken && !!state.user,
//     isAdmin: (state) => state.user?.role === 'admin',
//     isFlorist: (state) => state.user?.role === 'florist',
//     isCourier: (state) => state.user?.role === 'courier',
//   },

//   actions: {
//     setUser(user: AdminUser) {
//       this.user = user;
//     },

//     async sendOtp(phone: string) {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phone });
//     },

//     async verifyOtp(phone: string, code: string) {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
//         { phone, code },
//         { withCredentials: true }
//       );

//       if (!ALLOWED_ROLES.includes(data.data.user.role)) {
//         throw new Error('Bu panelga kirish huquqingiz yo\'q');
//       }

//       this.accessToken = data.data.accessToken;
//       this.user = data.data.user;
//     },

//     async refreshAccessToken() {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
//         {},
//         { withCredentials: true }
//       );
//       this.accessToken = data.data.accessToken;
//     },

//     async logout() {
//       try {
//         await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true });
//       } finally {
//         this.user = null;
//         this.accessToken = null;
//       }
//     },
//   },
// });

// // import { defineStore } from 'pinia';
// // import axios from 'axios';

// // // interface AdminUser {
// // //   id: string;
// // //   phone: string;
// // //   fullName?: string | null;
// // //   role: string;
// // // }

// // interface AdminUser {
// //   id: string;
// //   phone: string;
// //   fullName?: string | null;
// //   email?: string | null;
// //   role: string;
// // }


// // const ALLOWED_ROLES = ['admin', 'florist', 'courier'];

// // export const useAuthStore = defineStore('auth', {
// //   state: () => ({
// //     user: null as AdminUser | null,
// //     accessToken: null as string | null,
// //   }),

// //   getters: {
// //     isAuthenticated: (state) => !!state.accessToken && !!state.user,
// //     isAdmin: (state) => state.user?.role === 'admin',
// //     isFlorist: (state) => state.user?.role === 'florist',
// //     isCourier: (state) => state.user?.role === 'courier',
// //   },

// //   actions: {
// //     setUser(user: AdminUser) {
// //       this.user = user;
// //     },

// //     async sendOtp(phone: string) {
// //       await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phone });
// //     },

// //     async verifyOtp(phone: string, code: string) {
// //       const { data } = await axios.post(
// //         `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
// //         { phone, code },
// //         { withCredentials: true }
// //       );

// //       if (!ALLOWED_ROLES.includes(data.data.user.role)) {
// //         throw new Error('Bu panelga kirish huquqingiz yo\'q');
// //       }

// //       this.accessToken = data.data.accessToken;
// //       this.user = data.data.user;
// //     },

// //     async refreshAccessToken() {
// //       const { data } = await axios.post(
// //         `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
// //         {},
// //         { withCredentials: true }
// //       );
// //       this.accessToken = data.data.accessToken;
// //     },

// //     async logout() {
// //       try {
// //         await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, { withCredentials: true });
// //       } finally {
// //         this.user = null;
// //         this.accessToken = null;
// //       }
// //     },
// //   },
// // });
