import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://sparkbold.github.io',
  base: process.env.ASTRO_BASE ?? '/vnhv-mockups',
  trailingSlash: 'ignore',
});
