import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@public': path.resolve(__dirname, './public'),
      '@src': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './store'),
      '@server': path.resolve(__dirname, './server'),
      '@utils': path.resolve(__dirname, './utils')
    },
  },
  plugins: [
    vue(),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'ts']
    })
  ]
});
