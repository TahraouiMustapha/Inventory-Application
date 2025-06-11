const asyncHandler = require("express-async-handler");

const db = require("../db/queries");

const getAllGenres = asyncHandler(async function (req, res){
    const genres = await db.getAllGenres();

    if(!genres) {
        res.status(404).send("Genres Not Found")
        return
    }

    res.render("allGenres", {
        genres: genres
    })    
})

const getMoviesByGenreId = asyncHandler(async function (req, res){
    const { genreId } = req.params;

    const movies = await db.getMoviesByGenreId(Number(genreId));
    const genre = await db.getGenreById(Number(genreId));

    if(!movies) {
        res.send("No movie found")
        return;
    }

    if(!genre) {
        res.status(404).send("no genre found with this id")
        return;
    }

    res.render("moviesByGenre", {
        title: genre.name,
        movies: movies
    })
})


module.exports = {
    getAllGenres,
    getMoviesByGenreId
}
