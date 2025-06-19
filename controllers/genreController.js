const asyncHandler = require("express-async-handler");

const db = require("../db/queries");
// import functions for validation
const {body, validationResult} = require('express-validator');

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

    const pageTitle = genre.name[0].toUpperCase().concat(genre.name.slice(1));

    res.render("movies", {
        title: pageTitle,
        movies: movies
    })
})

const validateGenreDetails = [
    body("genreName")
        .trim()
        .notEmpty().withMessage('Genre name is required')
        .matches(/^[A-Za-z\s]+$/).withMessage('Genre name must contain letters and spaces only'),
];

const addGenre = [
    validateGenreDetails, 
    asyncHandler(async function(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log("errors is not empty")
            console.log(errors)
            return res.status(400).render("addGenre", {
                errors: errors.array()
            })
        }

        const { genreName } = req.body;
        console.log(genreName)

        await db.addGenre(genreName)

        res.redirect('/genres');
    })

] 


module.exports = {
    getAllGenres,
    getMoviesByGenreId, 
    addGenre
}
