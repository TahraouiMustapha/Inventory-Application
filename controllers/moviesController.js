const asyncHandler = require("express-async-handler")

// import db 
const db = require("../db/queries");

const getAllMovies = asyncHandler(async function (req, res) {
    const allMovies = await db.getAllMovies();

    console.log(allMovies)
    res.send('success')
})

const getMovieById = asyncHandler(async function(req, res) {
    const { movieId } = req.params;

    const movie = await db.getMovieById(Number(movieId))

    if(!movie) {
        console.log(" no movie found")
        res.send("no movie found")
        return
    }
    console.log(movie)    
    // redirect to movie page
    res.send('hi')
})


module.exports = {
    getAllMovies,
    getMovieById
}





