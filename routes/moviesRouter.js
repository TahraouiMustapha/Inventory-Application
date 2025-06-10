const { Router } = require("express");;

const moviesRouter = Router();


moviesRouter.get("/", (req, res)=> res.send("movies"));
moviesRouter.get("/:movieId", (req, res)=> {
    console.log(req.params.movieId)
    res.send("movieId")
})


module.exports = moviesRouter;
    