const pokeService = require('../services/pokeService');
const cache = require('../utils/cache');

const DEFAULT_PAGE_SIZE = 20;

async function listPokemon(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = DEFAULT_PAGE_SIZE;
    const offset = (page - 1) * limit;

    const cacheKey = `pokemon:list:${page}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const data = await pokeService.fetchPokemonList(limit, offset);
    const result = { count: data.count, page, results: data.results };

    cache.set(cacheKey, result, 300); // cache 5 min
    res.json(result);
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: 'error listing pokemon' });
  }
}

async function getPokemonDetail(req, res) {
  try {
    const id = req.params.nameOrId.toLowerCase();

    const cacheKey = `pokemon:detail:${id}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const data = await pokeService.fetchPokemonDetail(id);
    const result = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
      types: data.types.map(t => t.type.name),
      abilities: data.abilities.map(a => a.ability.name),
      stats: data.stats.map(s => ({ name: s.stat.name, base: s.base_stat }))
    };

    cache.set(cacheKey, result, 3600); // cache 1h
    res.json(result);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return res.status(404).json({ error: 'not found' });
    }
    console.error(err.message || err);
    res.status(500).json({ error: 'error getting detail' });
  }
}

async function suggestions(req, res) {
  try {
    const q = (req.query.q || '').trim().toLowerCase();
    const limit = Math.min(50, parseInt(req.query.limit || '10'));
    if (!q) return res.json([]);

    let names = cache.get('catalog:names');
    if (!names) {
      const all = await pokeService.fetchAllPokemonNames();
      names = all.map(x => x.name);
      cache.set('catalog:names', names, 3600);
    }

    const prefix = names.filter(n => n.startsWith(q));
    const substr = names.filter(n => !n.startsWith(q) && n.includes(q));

    const combined = prefix.concat(substr).slice(0, limit);

    res.json(combined.map(name => ({ name })));
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: 'error suggestions' });
  }
}

module.exports = { listPokemon, getPokemonDetail, suggestions };
