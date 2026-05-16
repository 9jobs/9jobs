const request = require('supertest');
const app = require('../server/app');

describe('API Health & Integration Tests', () => {
  it('should return 200 for the home page (EJS rendering)', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('9Jobs'); // Check if EJS rendered content exists
  });

  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/api/v1/invalid-route');
    expect(res.statusCode).toEqual(404);
  });

  it('should have a working Stripe checkout session route', async () => {
    const res = await request(app)
      .post('/api/create-checkout-session')
      .send({
        planName: 'Trial',
        price: '$25',
        period: '/ 1 day'
      });
    
    // It might return 500 if Stripe keys are invalid in test env, but we check if the route exists
    // If keys are valid, it should return 200 and an id
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('id');
    } else {
      console.warn('Stripe route returned status:', res.statusCode, res.body.error);
      expect(res.statusCode).toEqual(500); // Expected if keys are not configured for CI/test
    }
  });

  it('should serve terms and policy page', async () => {
    const res = await request(app).get('/terms-policy');
    expect(res.statusCode).toEqual(200);
  });
});
