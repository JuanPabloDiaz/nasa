/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_NASA_API_BASE_URL: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}
