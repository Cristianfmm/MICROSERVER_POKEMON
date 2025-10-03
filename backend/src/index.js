const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const POKEAPI_URL = 'https://pokeapi.co/api/v2';

app.get('/pokemon', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const response = await axios.get(`${POKEAPI_URL}/pokemon?limit=${limit}&offset=${offset}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo lista de pokémon' });
  }
});


app.get('/pokemon/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const response = await axios.get(`${POKEAPI_URL}/pokemon/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: 'Pokémon no encontrado' });
  }
});

// Exportamos la app para Jest
module.exports = app;


if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}
