/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLASSIFICATION_API_URL?: string;
  readonly VITE_REGRESSION_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
