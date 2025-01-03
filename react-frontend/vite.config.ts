import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from 'vite-plugin-wasm'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
  server: {
    fs: {
      allow:[
        path.resolve('..', 'GOL-core-rust', 'pkg'),
        './',
      ]
    }
  }
})
