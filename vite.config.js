import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [
    Vue(),
    Icons(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      eslintrc: {
        enabled: false,
        globalsPropValue: true,
        filepath: 'src/eslintrc-auto-imports.json',
      },
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      dts: 'src/auto-imports.js',
    }),
    Components({
      // 從 `./src/components/` 路徑查找
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/auto-components.js',
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
