import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')  // 让vite识别@符号
    }
  }
})
