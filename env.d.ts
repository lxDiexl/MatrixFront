/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT_GO: string;
  readonly VITE_LOG_LEVEL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
