const { Router } = require('express')

const genresRouter = Router();

const controller = require('../controllers/genreController')

genresRouter.get("/", controller.getAllGenres )
genresRouter.get("/genres/:genreId", (req, res)=> { console.log(req.params.genreId); res.send("good")})


module.exports = genresRouter;