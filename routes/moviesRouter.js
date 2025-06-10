const { Router } = require("express");;

const moviesRouter = Router();
// movies controller
const controller = require("../controllers/moviesController")

moviesRouter.get("/", controller.getAllMovies );
moviesRouter.get("/:movieId", controller.getMovieById)


module.exports = moviesRouter;
