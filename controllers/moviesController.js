const asyncHandler = require("express-async-handler")

// import db 
const db = require("../db/queries");

const getAllMovies = asyncHandler(async function (req, res) {
    const allMovies = await db.getAllMovies();

    res.render("movies", {
        title: "Movies",
        movies: allMovies
    })
})

const getMovieById = asyncHandler(async function(req, res) {
    const { movieId } = req.params;

    const movie = await db.getMovieById(Number(movieId))

    if(!movie) {
        res.status(404).send("Internal Error")
        return
    }
    
    const genre = await db.getGenreById(movie.genreid);
    res.render("individualMovie", {
        movie: movie,
        genreName: genre.name
    })
})


module.exports = {
    getAllMovies,
    getMovieById
}





