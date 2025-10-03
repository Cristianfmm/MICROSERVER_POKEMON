# Finandina Pokedex

Prueba técnica desarrollada en **Node.js (Express)** y **Angular**.  
La aplicación consume datos de [PokeAPI](https://pokeapi.co/) a través de un **backend propio** y los muestra en un **frontend en Angular** con buscador, lista paginada y detalle de cada Pokémon.

---

## 🚀 Tecnologías utilizadas
- **Backend:** Node.js, Express, Axios, Jest, Supertest
- **Frontend:** Angular, TypeScript, SCSS
- **Otros:** Nodemon, Docker (opcional)

---

## 📂 Estructura del proyecto
finandina-pokedex/
│
├── backend/ # API REST en Express
│ ├── src/
│ │ ├── index.js
│ │ ├── routes/
│ │ └── controllers/
│ └── tests/pokemon.test.js
│
├── frontend/ # Aplicación Angular
│ └── src/app/
│ ├── services/
│ ├── components/
│ │ ├── pokemon-list/
│ │ └── pokemon-detail/