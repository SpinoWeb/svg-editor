import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => ({
  //base: process.env.NODE_ENV === "development" ? "" : "/svg-editor/";
  base: command === "build" ? "/svg-editor/" : "/",
  plugins: [vue()],
}));
