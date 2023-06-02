import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      vue: '@vue/compat',
      '@': '/src',
    }
  },
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 3
          }
        }
      }
    }),
  ]
})
