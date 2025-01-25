import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000, // optional, uses process.env.PORT in Render
    allowedHosts: ["react-intern-rap8.onrender.com"], // Add your Render domain here
  },
});
