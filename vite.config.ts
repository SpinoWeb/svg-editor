import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  //process.env.NODE_ENV === "production"
  //base: import.meta.env.NODE_ENV === "production" ? '\svg-editor\' : '',
  base: command === "build" ? "/svg-editor/" : "/",
  plugins: [vue()],
}));
