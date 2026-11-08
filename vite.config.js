import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isVercel = process.env.VERCEL === '1'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: isVercel ? '/' : '/tinvictar-portfolio',
  build: {
    outDir: isVercel ? 'dist' : 'docs',
  },
});
