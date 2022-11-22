const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

//Traer todos los juegos tanto de la db como de la API
//Se puede traer todos los juegos que contengan la palabra que se reciba por query tanto de la db como de la API
router.get("/", async (req, res) => {
  //Guardo el nombre que recibo por query
  const { name } = req.query;

  try {
    if (name) {
      let gamesDB = await Videogame.findAll({
        where: { name: name.toLowerCase() },
        include: [Genre],
      });

      if (gamesDB.length > 0) {
        gamesDBFull = gamesDB.map((game) => {
          let gameDB = {
            id: game.id,
            name: game.name[0].toUpperCase() + game.name.substring(1),
            image: game.image,
            rating: game.rating,
            createdByUser: game.createdByUser,
            genres: game.genres.map((genre) => genre.name).join(", "),
            platforms: game.platforms,
          };

          return gameDB;
        });

        // Traigo de la API los primeros 15 juegos que coincidan con la palabra ingresada por query
        let gamesAPI = await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        );

        gamesAPIFull = gamesAPI.data.results.map((g) => {
          let game = {
            id: g.id,
            name: g.name,
            createdByUser: false,
            image: g.background_image,
            rating: g.rating,
            genres:
              g.genres &&
              g.genres
                .map((genre) => genre.name)
                .filter((genre) => genre !== null)
                .join(", "),
            platforms: g.platforms && g.platforms.map((p) => p.platform.name),
          };

          return game;
        });
        if (gamesAPIFull.concat(gamesDBFull).length === 0) {
          res
            .status(404)
            .json({ error: "No se encontraron juegos con ese nombre" });
        } else {
          res.status(200).json(gamesAPIFull.concat(gamesDBFull));
        }
      } else {
        //Traigo solo los juegos de la API con el nombre que recibí
        let gamesAPI = await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`
        );

        //gamesAPIFull es un array de objetos (game)
        gamesAPIFull = gamesAPI.data.results.map((g) => {
          //game contiene solo la información que necesito y la propiedad source para saber de donde fue obtenido
          let game = {
            id: g.id,
            name: g.name,
            createdByUser: false,
            image: g.background_image,
            rating: g.rating,
            genres:
              //Si tiene generos definidos hago un map y devuelvo un string de generos separados por ,
              g.genres &&
              g.genres
                .map((genre) => genre.name)
                .filter((genre) => genre !== null)
                .join(", "),
            platforms: g.platforms && g.platforms.map((p) => p.platform.name),
          };

          //Devuelvo game
          return game;
        });
        //Si en el array con toda la info no hay nada devuelvo un error. Y si tiene info dentro devuelvo el array
        if (gamesAPIFull.length === 0) {
          res
            .status(404)
            .json({ error: "No se encontraron juegos con ese nombre" });
        } else {
          res.status(200).json(gamesAPIFull);
        }
      }
      //Traer todos los juegos de la db y la API
    } else {
      let gameResults = [];

      let allGamesAPI = `https://api.rawg.io/api/games?key=${API_KEY}`;

      //Traigo juegos de la API
      for (let i = 0; i < 4; i++) {
        //En games almaceno la data
        let games = (await axios.get(allGamesAPI)).data;

        let dataGame = games.results.map((g) => {
          let game = {
            id: g.id,
            name: g.name,
            createdByUser: false,
            image: g.background_image,
            rating: g.rating,
            genres:
              g.genres &&
              g.genres
                .map((genre) => genre.name)
                .filter((genre) => genre !== null)
                .join(", "),
            platforms: g.platforms && g.platforms.map((p) => p.platform.name),
          };

          return game;
        });
        //Ahora el endpoint es igual al link que se encuentra en games.next, que trae los siguientes 40 juegos
        allGamesAPI = games.next;
        gameResults = gameResults.concat(dataGame);
      }

      //Traigo todos los juegos de la DB junto con la tabla Genre
      const gamesDB = await Videogame.findAll({
        include: [Genre],
      });

      //Paso lo que está en gamesDB a JSON
      let jsonGamesDB = gamesDB.map((g) => g.toJSON());

      jsonGamesDB.forEach((X) => {
        (X.name = X.name[0].toUpperCase() + X.name.substring(1)),
          (X.createdByUser = true),
          (X.genres = X.genres
            .map((genre) => genre.name)
            .filter((g) => g !== null)
            .join(", ")),
          (X.platforms = X.platforms.map((platform) => platform));
      });

      gameResults = gameResults.concat(jsonGamesDB);

      res.json(gameResults);
    }
  } catch (e) {
    res.status(404).json({ e });
  }
});

module.exports = router;