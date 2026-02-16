import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
specPattern: 'cypress/fixtures/e2e/**/*.cy.{js,jsx,ts,tsx}',    baseUrl: 'http://localhost:5173', // Cambia esto según tu configuración
  },
});
