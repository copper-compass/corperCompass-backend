import request from 'supertest';
import app from '../backend/src/app.js';
import User from '../backend/src/models/User.js';
import mongoose from 'mongoose';

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    // Connect to test database (use separate DB)
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/corpercompass_test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  test('POST /api/auth/register should create a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toBe(201);
    expect(res.headers['set-cookie']).toBeDefined();
    expect(res.body.email).toBe('test@example.com');
  });

  test('POST /api/auth/login should authenticate user', async () => {
    // First register
    await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    // Then login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});
