import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  id: string;
  phone: string;
  fullName?: string | null;
  role: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

const STORAGE_KEY = 'peony_auth';

function readFromStorage(): { accessToken: string | null; user: User | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { accessToken: null, user: null };
    const parsed = JSON.parse(raw);
    return { accessToken: parsed.accessToken ?? null, user: parsed.user ?? null };
  } catch {
    return { accessToken: null, user: null };
  }
}

function writeToStorage(accessToken: string | null, user: User | null) {
  if (accessToken && user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accessToken, user }));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => readFromStorage(),

  getters: {
    isAuthenticated: (state) => !!state.accessToken && !!state.user,
  },

  actions: {
    async sendOtp(phone: string) {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phone });
    },

    async verifyOtp(phone: string, code: string, fullName?: string) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        { phone, code, fullName },
        { withCredentials: true }
      );
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

// interface User {
//   id: string;
//   phone: string;
//   fullName?: string | null;
//   role: string;
// }

// interface AuthState {
//   user: User | null;
//   accessToken: string | null; 
// }

// export const useAuthStore = defineStore('auth', {
//   state: (): AuthState => ({
//     user: null,
//     accessToken: null,
//   }),

//   getters: {
//     isAuthenticated: (state) => !!state.accessToken && !!state.user,
//   },

//   actions: {
//     async sendOtp(phone: string) {
//       await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/send-otp`, { phone });
//     },

//     async verifyOtp(phone: string, code: string, fullName?: string) {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
//         { phone, code, fullName },
//         { withCredentials: true }
//       );
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
