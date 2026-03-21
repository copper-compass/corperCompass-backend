import request from 'supertest'
import app from '../backend/src/app.js'
import User from '../backend/src/models/User.js'
import mongoose from 'mongoose'

// Set NODE_ENV to test to endure it makes use of the large rate limiting for tests
// Ensure to change it back to production on launc 

describe('Input Sanitization', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/corpercompass_test')
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('POST /api/auth/register - sanitization', () => {
    test('should trim whitespace from name', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: '  Test User  ',
          email: 'test@example.com',
          password: 'password123',
        })
      expect(res.statusCode).toBe(201)
      expect(res.body.name).toBe('Test User')
    })

    test('should escape HTML in name', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: '<script>alert("xss")</script>',
          email: 'test@example.com',
          password: 'password123',
        })
      expect(res.statusCode).toBe(201)
      expect(res.body.name).not.toContain('<script>')
    })

    test('should normalize email to lowercase', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'TEST@EXAMPLE.COM',
          password: 'password123',
        })
      expect(res.statusCode).toBe(201)
      expect(res.body.email).toBe('test@example.com')
    })

    test('should reject invalid email format', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'not-an-email',
          password: 'password123',
        })
      expect(res.statusCode).toBe(400)
    })

    test('should reject missing name', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123',
        })
      expect(res.statusCode).toBe(400)
    })

    test('should reject password shorter than 6 characters', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: '123',
        })
      expect(res.statusCode).toBe(400)
    })
  })

  describe('POST /api/auth/login - sanitization', () => {
    beforeEach(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
        })
    })

    test('should normalize email on login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'TEST@EXAMPLE.COM',
          password: 'password123',
        })
      expect(res.statusCode).toBe(200)
    })

    test('should reject missing email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          password: 'password123',
        })
      expect(res.statusCode).toBe(400)
    })

    test('should reject missing password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
        })
      expect(res.statusCode).toBe(400)
    })

    test('should reject invalid email format on login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'notvalid',
          password: 'password123',
        })
      expect(res.statusCode).toBe(400)
    })
  })
})