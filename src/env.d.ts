/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** SmartApp Bridge version */
  readonly LIB_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}