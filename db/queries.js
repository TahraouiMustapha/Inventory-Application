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

// async function getMoviesByGenreId(genreId) {
//     const { rows } = await pool.query("SELECT * FROM movies WHERE genreId = $1", [genreId]);
//     return rows;
// }

module.exports = {
    getAllMovies,
    getMovieById,
    getAllGenres,
    // getMoviesByGenreId
}