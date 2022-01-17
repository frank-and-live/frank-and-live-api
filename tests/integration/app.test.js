const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const config = require('../../src/config/config');

describe('App routes', () => {
  describe('GET /', () => {
    test('should return 200', async () => {
      await request(app).get('/').expect(httpStatus.OK);
      config.env = process.env.NODE_ENV;
    });
  });

  describe('GET /login', () => {
    test('should return 200', async () => {
      await request(app).get('/login').expect(httpStatus.OK);
      config.env = process.env.NODE_ENV;
    });
  });

  describe('GET /', () => {
    test('should return 200', async () => {
      await request(app).get('/register').expect(httpStatus.OK);
      config.env = process.env.NODE_ENV;
    });
  });
});
