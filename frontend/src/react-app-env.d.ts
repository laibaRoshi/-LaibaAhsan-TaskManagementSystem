/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string; // Type the environment variable here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  