import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    testIsolation: false, // Place this setting directly within the e2e object
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});