const NodeCache = require('node-cache');

// TTL por defecto: 1 hora
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 120 });

module.exports = cache;
