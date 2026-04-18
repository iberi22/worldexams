/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    country: import('../../config/countries.config').CountryConfig;
  }
}
