const { Router } = require('express')

const genresRouter = Router();

const controller = require('../controllers/genreController')

genresRouter.get("/", controller.getAllGenres )
genresRouter.get("/:genreId", controller.getMoviesByGenreId )


module.exports = genresRouter;