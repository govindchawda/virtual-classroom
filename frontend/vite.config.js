import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



export default defineConfig({
  plugins: [react()],
  build: {
    // Drop console and debugger in production build
    minify: 'esbuild',
    esbuild: {
      drop: ['console', 'debugger'],
    },
  },
});