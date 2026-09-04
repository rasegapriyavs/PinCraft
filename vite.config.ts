import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite keeps the local development setup small and fast.
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves this repository from /PinCraft/, not the domain root.
  base: '/PinCraft/',
})
