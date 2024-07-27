import { faker } from "@faker-js/faker";

describe('URL Shortener Backend Tests', () => {
  const validUserId = '66a4867f20df4f4ce8fcb65c';
  const fullUrl = 'https://www.exampleesadasdasdas.com';
  let shortUrlId;
  const urls = Array.from({ length: 10 }, () => faker.internet.url());

  describe('Creating Short URLs', () => {
    it('should shorten a valid URL and associate it with a user', () => {
      cy.request('POST', 'http://localhost:5001/api/shortUrl', {
        fullUrl,
        userId: validUserId,
      })
      .then((response) => {
        expect(response.status).to.equal(201); // 201 Created
        expect(response.body).to.have.property('shortUrl');
        shortUrlId = response.body.shortUrl.split('/').pop(); // Extract the ID
      });
    });

    it('should return an error for an invalid URL', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:5001/api/shortUrl',
        failOnStatusCode: false,  // Allow non-2xx status codes for this test
        body: {
          fullUrl: 'invalid-url',
          userId: validUserId,
        },
      })
      .then((response) => {
        expect(response.status).to.equal(409); // Bad Request
        expect(response.body).to.have.property('message', 'This URL is already associated with this user');
      });
    })
  });

  describe('deleting Short URLs', () => {
    it('should delete a shortened URL', function () {
      cy.request({
          method: 'DELETE',
          url: 'http://localhost:5001/api/shortUrl/66a4867f20df4f4ce8fcb65c/66a4a360e24c698af3581c99', // Replace 'someUrlId' with a valid ID
          failOnStatusCode: false // This will prevent Cypress from failing the test on non-2xx status codes
      }).then((response) => {
          expect(response.body.message).to.eq('URL deleted successfully');
      });
  });
});
})

