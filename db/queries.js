const pool = require('./pool');

async function getAllMovies() {
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows;
}

async function getMovieById(movieId) {
    const { rows } = await pool.query("SELECT * FROM movies where movieId = $1", [movieId]);
    return rows[0];
}

async function getAllGenres() {
    const { rows } = await pool.query("SELECT * FROM genres");
    return rows;
}

async function getMoviesByGenreId(genreId) {
    const { rows } = await pool.query("SELECT * FROM movies WHERE genreId = $1", [genreId]);
    return rows;
}

async function getGenreById(genreId) {
    const { rows } = await pool.query("SELECT * FROM genres WHERE genreId = $1", [genreId]);
    return rows[0];
}

async function createMovie({movieTitle, movieReleasedate, movieRating, movieSummary, movieGenreid, movieImagesrc}) {
    await pool.query(
        "INSERT INTO movies (title, releasedate, rating, summary, genreid, imagesrc) values ($1, $2, $3, $4, $5, $6)", 
        [movieTitle, movieReleasedate, movieRating, movieSummary, movieGenreid, movieImagesrc ]
    )
}

async function updateMovie(movieObj) {
    await pool.query (
        `Update movies 
         SET title = $1, releasedate = $2, rating = $3, summary = $4, genreId = $5
         where movieId = $6`,
         [movieObj.title, movieObj.releasedate, movieObj.rating, movieObj.summary, movieObj.genreId, movieObj.movieId]
    )
}

async function deleteMovie(movieId) {
    await pool.query(
        `DELETE FROM movies
        WHERE  movieid = $1`, 
        [movieId]
    )
}

async function addGenre(genreName) {
    await pool.query(
        `INSERT INTO genres(name)
        values($1)`,
        [genreName] 
    )
}

module.exports = {
    getAllMovies,
    getMovieById,
    getAllGenres,
    getGenreById,
    getMoviesByGenreId, 
    createMovie,
    updateMovie,
    deleteMovie,
    addGenre
}