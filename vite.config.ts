import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    eslint()
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build'
  }
})