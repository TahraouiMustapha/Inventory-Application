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

async function createMovie({title, releasedate, rating, summary, genreId, imagesrc}) {
    await pool.query(
        "INSERT INTO movies (title, releasedate, rating, summary, genreid, imagesrc) values ($1, $2, $3, $4, $5, $6)", 
        [title, releasedate, rating, summary, genreId, imagesrc ]
    )
}

module.exports = {
    getAllMovies,
    getMovieById,
    getAllGenres,
    getGenreById,
    getMoviesByGenreId
}