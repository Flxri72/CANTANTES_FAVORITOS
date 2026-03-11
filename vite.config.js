import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/CANTANTES_FAVORITOS/',
  build: {
    outDir: 'dist'
  },
  server: {
    host: true,
    port: 5173
  }
})

