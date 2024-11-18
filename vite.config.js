import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from "dotenv";
const env = config({ path: ".env.testing" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
    env: env,
  },
});
