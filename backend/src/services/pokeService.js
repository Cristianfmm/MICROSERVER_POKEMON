const axios = require('axios');
const BASE = process.env.POKEAPI_BASE || 'https://pokeapi.co/api/v2';

async function fetchPokemonList(limit = 20, offset = 0) {
  const url = `${BASE}/pokemon?limit=${limit}&offset=${offset}`;
  const { data } = await axios.get(url);
  return data; // {count, results, next, previous}
}

async function fetchPokemonDetail(nameOrId) {
  const { data } = await axios.get(`${BASE}/pokemon/${encodeURIComponent(nameOrId)}`);
  return data;
}

async function fetchAllPokemonNames() {
  // primer request para saber el total
  const r = await axios.get(`${BASE}/pokemon?limit=1&offset=0`);
  const total = r.data.count;
  const { data } = await axios.get(`${BASE}/pokemon?limit=${total}&offset=0`);
  return data.results; // [{name, url}, ...]
}

module.exports = { fetchPokemonList, fetchPokemonDetail, fetchAllPokemonNames };
