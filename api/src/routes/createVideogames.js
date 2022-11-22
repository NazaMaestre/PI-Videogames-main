const express = require("express");
const router = express.Router();
const { Genre, Videogame } = require("../db");

router.post("/", async (req, res) => {
  const { name, description, image, releaseDate, rating, platforms, genres } = req.body;
  if (!name || !description || !platforms) {
    res.status(404).send("Missing info");
    return;
  }
  if (rating > 5 || rating < 1) {
    res.status(404).send("Rating must be between 1-5");
    return;
  }
  try {
    const newGame = await Videogame.create({
      name: name,
      createdByUser: true,
      description: description,
      image: image,
      releaseDate: releaseDate,
      rating: rating,
      platforms: platforms,
    }); 
    //Busco cada Genre en la DB y se los agrego a newGame
    genres.forEach(async(g) => {
      let genresGame = await Genre.findOne({ where: { name: g } });
      await newGame.addGenre(genresGame);
    });

    res.send("Videogame created successfully!");
    } catch (e) {
    res.status(404).send(e.message);
    }
});

module.exports = router;