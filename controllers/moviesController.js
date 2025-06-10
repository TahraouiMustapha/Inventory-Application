const asyncHandler = require("express-async-handler")

// import db 
const db = require("../db/queries");

const getAllMovies = asyncHandler(async function (req, res) {
    const allMovies = await db.getAllMovies();

    console.log(allMovies)
    res.send('success')
})

module.exports = {
    getAllMovies
}





