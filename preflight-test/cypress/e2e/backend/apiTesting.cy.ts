import { faker } from "@faker-js/faker";

describe('URL Shortener Backend Tests', () => {
  const validUserId = '66a13eaac42f85856a0f6d38';
  const fullUrl = 'https://www.examplee32222.com';
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
    });

    it('should return an error if the user already shortened the same URL', () => {
      cy.request('POST', 'http://localhost:5001/api/shortUrl', {
        fullUrl,
        userId: validUserId,
      });

      cy.request({ // Make the second request with failOnStatusCode: false
        method: 'POST',
        url: 'http://localhost:5001/api/shortUrl',
        failOnStatusCode: false,
        body: {
          fullUrl,
          userId: validUserId,
        },
      })
      .then((response) => {
        expect(response.status).to.equal(409); // Conflict
        expect(response.body).to.have.property('message', 'This URL is already associated with this user');
      });
    });
  });

  describe('URL Redirection', () => {
    beforeEach(() => {
      // Create a short URL before each redirection test
      cy.request('POST', 'http://localhost:5001/api/shortUrl', {
        fullUrl,
        userId: validUserId,
      }).then((response) => {
        shortUrlId = response.body.shortUrl.split('/').pop();
      });
    });

    it('should redirect to the original URL for a valid short URL', () => {
      cy.request({
        method: 'GET',
        url: `http://localhost:5001/api/shortUrl/${shortUrlId}`,
        followRedirect: false, 
      }).then((response) => {
        expect(response.status).to.equal(302);
        expect(response.headers['location']).to.equal('https://www.example.com');
      });
    });
  });


  it('should delete a shortened URL', function () {
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:5001/api/shortUrl/66a0a23f4bb14082701d44ea', // Replace 'someUrlId' with a valid ID
        failOnStatusCode: false // This will prevent Cypress from failing the test on non-2xx status codes
    }).then((response) => {
        expect(response.status).to.eq(200); // Verify the status code if needed
        expect(response.body.message).to.eq('URL deleted successfully');
    });
});
  
});

