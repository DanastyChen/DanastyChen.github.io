import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 引入插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 添加到插件列表
  ],
  // 如果您要部署到 username.github.io，base 通常是 '/'
  // 如果是 username.github.io/repo-name，base 应该是 '/repo-name/'
  base: '/', 
})