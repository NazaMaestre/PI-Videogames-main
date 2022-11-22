const express = require("express");
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Genre } = require("../db");

const router = express.Router();

router.get("/", async (req, res) => {
  const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`); //Entro a la API y me trae la info
  const genres = genresApi.data.results.map(el => el.name); //Mapea la info
  genres.forEach(el => {
      Genre.findOrCreate({ 
          where: {name: el}
      }) //Hago un findOrCreate en el modelo y me lo guarda
  });
  const allGenres = await Genre.findAll();
  res.json(allGenres);
});




module.exports = router;