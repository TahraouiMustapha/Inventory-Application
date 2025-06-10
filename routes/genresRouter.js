const { Router } = require('express')

const genresRouter = Router();

genresRouter.get("/", (req, res)=> res.send('genres'))
genresRouter.get("/genres/:genreId", (req, res)=> { console.log(req.params.genreId); res.send("good")})


module.exports = genresRouter;