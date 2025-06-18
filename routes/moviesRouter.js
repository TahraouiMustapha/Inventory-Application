const { Router } = require("express");

const moviesRouter = Router();
// movies controller
const controller = require("../controllers/moviesController")

moviesRouter.get("/", controller.getAllMovies );
moviesRouter.get("/addmovie", (req, res)=> res.render("addMovie", {
    title: "Add new movie"
}))
moviesRouter.get("/:movieId", controller.getMovieById)
moviesRouter.get("/update/:movieId", controller.getMoviesDetails)


moviesRouter.post("/addmovie", controller.createMovie)
moviesRouter.post("/update/:movieId", controller.updateMovie)

module.exports = moviesRouter;
