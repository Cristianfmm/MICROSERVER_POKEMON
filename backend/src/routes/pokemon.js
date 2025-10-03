const express = require('express');
const router = express.Router();
const controller = require('../controllers/pokemonController');

// listar pokémon con paginación
router.get('/pokemon', controller.listPokemon);

// detalle de un pokémon por nombre o id
router.get('/pokemon/:nameOrId', controller.getPokemonDetail);

// sugerencias (autocomplete)
router.get('/suggestions', controller.suggestions);

module.exports = router;
