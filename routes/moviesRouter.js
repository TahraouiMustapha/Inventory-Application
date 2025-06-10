const { Router } = require("express");;

const moviesRouter = Router();
// movies controller
const controller = require("../controllers/moviesController")

moviesRouter.get("/", controller.getAllMovies );
moviesRouter.get("/:movieId", (req, res)=> {
    console.log(req.params.movieId)
    res.send("movieId")
})


module.exports = moviesRouter;
