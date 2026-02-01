import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api'),
      '@context': path.resolve(__dirname, './src/context'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
})
