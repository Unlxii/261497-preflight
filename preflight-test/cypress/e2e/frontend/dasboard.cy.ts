import { faker } from '@faker-js/faker';

describe('Dashboard URL Addition', () => {
  beforeEach(() => {
    // Log in before each test in this suite
    cy.visit('http://localhost:3000/login');
    cy.get('input[placeholder="Email Address"]').type('test@test.com');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('button[type="submit"]').click();

    // Wait for the dashboard to load
    cy.url().should('include', '/dashboard'); 
  });

  const urls = Array.from({ length: 5 }, () => faker.internet.url());

  urls.forEach((url) => {
    it(`should add and display URL: ${url}`, () => {
      cy.get('input[placeholder="paste your link to shorten here."]').should('exist');
      cy.get('input[placeholder="paste your link to shorten here."]').type(url);
      cy.get('button[type="submit"]').click();

      // Customize this selector based on how URLs are displayed in your dashboard
      cy.contains(url).should('be.visible'); 
    });
  });

  // Additional test for adding multiple URLs at once
  it('should add multiple URLs at the same time', () => {
    const multipleUrls = urls.slice(0, 3).join('\n'); // Use the first 3 URLs
    
    cy.get('input[placeholder="paste your link to shorten here."]').type(multipleUrls);
    cy.get('button[type="submit"]').click();

    urls.slice(0, 3).forEach(url => {  // Check the first 3 URLs
        cy.contains(url).should('be.visible');
    });
  });
});

describe('Another Test Suite', () => {
  // ... other test cases not requiring login
});
