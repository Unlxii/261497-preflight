import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    testIsolation: false, // Place this setting directly within the e2e object
    baseUrl: 'http://localhost:5001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});