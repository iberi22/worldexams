/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// DEV-only test surface exposed by src/pages/juego/harness.astro (gated by import.meta.env.DEV).
interface Window {
  __wxJuego?: Record<string, unknown>;
}

declare namespace App {
  interface Locals {
    country?: any;
    countryCode?: string;
    countryDetected?: boolean;
    countryHasContent?: boolean;
    countryName?: string;
    countryFlag?: string;
    runtime?: {
      env?: Record<string, string | undefined>;
    };
  }
}

interface ImportMetaEnv {
  readonly PUBLIC_ROOMS_SUPABASE_MIRROR?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_API_BASE_URL?: string;
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

