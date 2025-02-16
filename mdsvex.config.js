// mdsvex.config.js
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

export default defineConfig({
  extensions: ['.md'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [],
  rehypePlugins: []
});