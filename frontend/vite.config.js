// vite.config.js
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8086/',
        changeOrigin: true,
        rewrite: (path) => path.replace('', ''),
        bypass(req, res, options) {
        const proxyUrl = options.target + options.rewrite(req.url);
        //console.log('代理后的地址:', proxyUrl); // 控制台打印
        res.setHeader('x-proxy-url', proxyUrl); // 设置到响应头
        }
      },
    }
  },
  test: {
    // ... Specify options here.
    environment: 'jsdom', // 使用 jsdom 模拟浏览器环境
    globals: true,
  },
})