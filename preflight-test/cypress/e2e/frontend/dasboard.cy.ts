import { faker } from '@faker-js/faker';

describe('Dashboard URL Addition', () => {
  // Move the login to the beginning of the test suite
  before(() => {
    
    cy.visit('http://localhost:3004/login'); 
    cy.get('input[placeholder="Email Address"]').type('test@test');
    cy.get('input[placeholder="Password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard'); 
  });

  const urls = Array.from({ length: 100 }, () => faker.internet.url());

  for (let index = 0; index < urls.length; index++) {
    it(`should add URL: ${urls[index]}`, () => {
      
        cy.get('body').then(($body) => {
          console.log(`State before adding URL ${index + 1}:`, $body.html());
        });
  
        // Wait for the input element to be visible with a more generous timeout
        cy.get('input[placeholder=" paste your link to shorten here."]', { timeout: 10000 }).should('be.visible');
  
        // Now that the input is visible, clear it and type the URL
        cy.get('input[placeholder=" paste your link to shorten here."]')
          .clear()
          .type(urls[index]);
  
        cy.get('button[type="submit"]').contains('Add').click();
  
        cy.get('body').then(($body) => {
          console.log(`State after adding URL ${index + 1}:`, $body.html());
        });
  
        cy.contains(urls[index]).should('be.visible'); 

    });

    // it(`should delete URL: ${urls[index]}`, () => {
    //   cy.contains(urls[index]).parent().parent().within(() => {
    //     cy.get('div.cursor-pointer.px-2').eq(1).click();
    //   });
    //   cy.contains(urls[index]).should('not.exist'); // Ensure the URL is deleted
    // });

  }
});
