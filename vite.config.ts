import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: "/react-my-Portfolio/",
  plugins: [
    tailwindcss(),
  ]
})
