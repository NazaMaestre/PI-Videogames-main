const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require("../routes/videogames");
const videogame = require("../routes/videogame");
const genres = require("../routes/genres");
const createVideogame = require("../routes/createVideogames");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//Traigo todos los juegos
router.use("/videogames", videogames);
//Traigo un juego por su id
router.use("/videogame", videogame);
//Creo un videojuego
router.use("/videogame", createVideogame);
//Traigo todos los generos
router.use("/genres", genres);

module.exports = router;

