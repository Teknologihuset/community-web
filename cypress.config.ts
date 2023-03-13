import { defineConfig } from "cypress";

// https://docs.cypress.io/guides/references/migration-guide

export default defineConfig({
  chromeWebSecurity: false,

  env: {
    COOKIE_NAME: "next-auth.session-token",
    SITE_NAME: "http://localhost:3000",
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
});
