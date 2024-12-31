import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


// vite.config.js
// export default {
//   server: {
//     port: 3000, // Use any available port
//   },
// };
