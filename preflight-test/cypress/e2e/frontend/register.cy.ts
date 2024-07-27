import { faker } from '@faker-js/faker';

describe('User Registration', () => {
  for (let i = 0; i < 300; i++) { // Generate 10 random users
    const user = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    it(`should register user ${user.name}`, () => {
      cy.visit('http://localhost:3004/register'); // Adjust URL based on your frontend route

      cy.get('input[placeholder="e.g FullStack"]').type(user.name);
      cy.get('input[placeholder="Email Address"]').type(user.email);
      cy.get('input[placeholder="Password"]').type(user.password);
      cy.get('button[type="submit"]').click();
    });
  }
});