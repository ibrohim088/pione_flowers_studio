/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STORE_LAT?: string;
  readonly VITE_STORE_LNG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


// / <reference types="vite/client" />
// interface ImportMetaEnv {
//   readonly VITE_API_URL: string;
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }
