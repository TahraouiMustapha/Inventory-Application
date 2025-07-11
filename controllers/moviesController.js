const asyncHandler = require("express-async-handler")

// import db 
const db = require("../db/queries");

// import from express validator
const {body, validationResult} = require("express-validator");

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

const getMovieForm = asyncHandler(async function (req, res){
    const genres = await db.getAllGenres()

    res.render("addMovie", {
        title: "Add new movie", 
        genres: genres
    })
})

const validateMovie = [
    body("movieTitle") 
        .notEmpty()
        .withMessage("Movie title is required"),
    body("movieReleasedate")
        .notEmpty()
        .withMessage("Movie date is required"), 
    body("movieRating")
        .notEmpty().withMessage("Movie Rating is required")
        .isFloat({min: 0, max: 10}).withMessage("Movie Rating must be between 0 and 10")
]

const createMovie = [
    validateMovie, 
    asyncHandler(async (req, res) => {
        const genres = await db.getAllGenres()
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("addMovie", {
                title: "Add new movie", 
                errors: errors.array(),
                genres: genres
            })
        }
        
        const {movieTitle, movieReleasedate, movieRating, movieSummary, movieGenreid} = req.body;
        await db.createMovie({movieTitle, movieReleasedate, movieRating, movieSummary, movieGenreid, movieImagesrc:null});
        res.redirect("/movies");
    })
]

const getMoviesDetails = asyncHandler(async function (req,res) {
    const { movieId } = req.params;
    
    const movie = await db.getMovieById(movieId);
    const genres = await db.getAllGenres();
    if(!movie) {
        res.status(404).send("Movie Not Found!");
        return;
    }

    res.render("updateMovie", {
        movie: movie, 
        genres: genres
    })
})

const updateMovie = asyncHandler(async function (req, res) {
    const { movieId } = req.params;
    const { movieTitle, movieReleasedate, movieRating, movieGenreid, movieSummary} = req.body;

    await db.updateMovie({
        movieId: movieId, 
        title: movieTitle, 
        releasedate: movieReleasedate, 
        rating : movieRating, 
        summary: movieSummary, 
        genreId: movieGenreid   
   })

   res.redirect(`/movies/${movieId}`);
})

const deleteMovie = asyncHandler(async function(req, res) {
    const {movieId} = req.params;

    await db.deleteMovie(movieId)

    res.redirect("/movies")
})


module.exports = {
    getAllMovies,
    getMovieById, 
    getMovieForm,
    createMovie,
    getMoviesDetails,
    updateMovie,
    deleteMovie
}





