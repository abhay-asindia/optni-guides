import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Static site for guides.optni.ai (AWS Amplify static hosting serves dist/).
export default defineConfig({
  site: "https://guides.optni.ai",
  output: "static",
  outDir: "dist",
  trailingSlash: "always",
  build: { format: "directory", inlineStylesheets: "auto" },
  compressHTML: true,
  integrations: [sitemap()],
  devToolbar: { enabled: false },
});
