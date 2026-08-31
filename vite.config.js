import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    vue(),
    Sitemap({
      hostname: 'https://lyrafoxwood.app',
      dynamicRoutes: [
        '/',
        '/about',
        '/skills',
        '/music',
        '/links'
      ]
    })
  ]
})