const request = require('supertest');
const app = require('../src/index'); 

describe('Pruebas de la API de Pokémon', () => {
  it('GET /pokemon debe devolver una lista de Pokémon', async () => {
    const response = await request(app).get('/pokemon?page=1&limit=5');

    expect(response.status).toBe(200);
    expect(response.body.results).toBeDefined();
    expect(Array.isArray(response.body.results)).toBe(true);
    expect(response.body.results.length).toBeGreaterThan(0);
    expect(response.body.results[0]).toHaveProperty('name');
    expect(response.body.results[0]).toHaveProperty('url');
  });

  
  it('GET /pokemon/:name debe devolver datos de Bulbasaur', async () => {
    const response = await request(app).get('/pokemon/bulbasaur');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'bulbasaur');
    expect(response.body).toHaveProperty('height');
    expect(response.body).toHaveProperty('weight');
  });

  
  it('GET /pokemon/:name debe devolver 404 si no existe', async () => {
    const response = await request(app).get('/pokemon/noexiste123');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Pokémon no encontrado');
  });
});
