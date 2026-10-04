import { defineConfig } from 'astro/config';

export default defineConfig({
  // 公開先が決まったら差し替える
  site: 'https://example.com',
  trailingSlash: 'always',
});
