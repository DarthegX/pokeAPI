const request = require('supertest');
import app  from '../src/app.js';


describe("Test root path", () => {
  test('should response the GET method', () => {
    return request(app)
      .get('/pokemon/')
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe('Test the Pokemon endpoint', () => {
  test("should specify json as the content type in the http header", () => {
    return request(app)
      .get("/pokemon/:name").then(response => {
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
      });
  });
});
