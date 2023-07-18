const request = require('supertest');
const app = require('../app'); 
const User = require('../models/userModel');

describe('Login Controller', () => {
  beforeEach(async () => {
    await User.create({ email: 'test@example.com', password: 'testpassword', subscription: 'free' });
  });

  afterEach(async () => {
    await User.deleteOne({ email: 'test@example.com' });
  });
  
  it('should return status code 200, token and user object with email and subscription fields', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'testpassword' });
  
    expect(response.status).toBe(401);
    expect(response.body).not.toHaveProperty('token');
    expect(response.body.user).toBeUndefined();
  });
  
    it('should return status code 401 for invalid credentials', async () => {
        const response = await request(app)
          .post('/api/users/login')
          .send({ email: 'invalid@example.com', password: 'invalidpassword' });
      
        expect(response.status).toBe(401);
      });
  });