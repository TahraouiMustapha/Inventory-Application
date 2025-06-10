const pool = require('./pool');

async function getAllMovies() {
    const { rows } = await pool.query("SELECT * FROM movies");
    return rows;
}

async function getMovieById(movieId) {
    const { rows } = await pool.query("SELECT * FROM movies where movieId = $1", [movieId]);
    return rows[0];
}

module.exports = {
    getAllMovies,
    getMovieById
}