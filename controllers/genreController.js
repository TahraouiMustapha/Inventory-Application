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


module.exports = {
    getAllGenres
}
