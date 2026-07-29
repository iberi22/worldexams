/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ROOMS_SUPABASE_MIRROR?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    country: import('../../config/countries.config').CountryConfig;
    countryCode?: string;
    countryDetected?: boolean;
    countryHasContent?: boolean;
    countryName?: string;
    countryFlag?: string;
  }
}
