/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GLOBAL_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
