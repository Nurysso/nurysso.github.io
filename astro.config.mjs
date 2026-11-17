import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import { EULIX_SITE } from './src/data/site.js';

// /writing/ is noindex while every post is a draft, so keep it out of the sitemap too.
const hasPublishedPosts = readdirSync('./src/content/writing')
  .filter((f) => f.endsWith('.md'))
  .some((f) => !/^draft:\s*true\s*$/m.test(readFileSync(`./src/content/writing/${f}`, 'utf8')));

export default defineConfig({
  site: 'https://nurysso.github.io',
  integrations: [sitemap({ filter: (page) => hasPublishedPosts || !page.endsWith('/writing/') })],
  redirects: {
    '/eulix': EULIX_SITE,
  },
  markdown: {
    // Monochrome code blocks: token colors come from --astro-code-* in global.css
    shikiConfig: { theme: 'css-variables' },
  },
  vite: {
    // Plain CSS, no PostCSS plugins. Inline config also stops Vite from picking up stray postcss.config files.
    css: { postcss: {} },
  },
});
