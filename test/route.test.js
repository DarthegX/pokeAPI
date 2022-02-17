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
  const pokemonName = 'ditto';

  test("should contain pokemon name in the json response", () => {
    return request(app)
      .get(`/pokemon/${pokemonName}`).then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));

        const responseJson = JSON.parse(response.text);
        expect(responseJson.name).toEqual(pokemonName);
      });
  });
});


describe('Test the Pokemon endpoint', () => {
  const pokemonName = 'ditto';

  test("should return a valid id", () => {
    return request(app)
      .get(`/pokemon/${pokemonName}`).then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));

        const responseJson = JSON.parse(response.text);

        expect(responseJson.id).toBeGreaterThanOrEqual(1);
        expect(responseJson.id).toBeLessThanOrEqual(1118)
      });
  });
});
