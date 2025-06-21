#! /usr/bin/env node

const { Client } = require('pg')

const SQL = `
    CREATE TABLE IF NOT EXISTS genres (
        genreid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        name VARCHAR(40)  
    );

    CREATE TABLE IF NOT EXISTS movies (
        movieid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
        title VARCHAR(50), 
        releasedate DATE, 
        rating NUMERIC(2, 1), 
        summary VARCHAR(255), 
        genreid INTEGER, 
        imagesrc VARCHAR(300), 
        FOREIGN KEY (genreid) REFERENCES genres(genreid)
    );

    INSERT INTO genres (name) 
    VALUES 
    ('Action'), ('Drama'), ('Romance');

  INSERT INTO movies (title, releasedate, rating, summary, genreid, imagesrc) VALUES
('Inception', '2010-07-16', 8.8, 'A thief who steals corporate secrets through dream-sharing tech.', 1, 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'),
('The Matrix', '1999-03-31', 8.7, 'A computer hacker learns about the true nature of his reality.', 1, 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg'),
('Mad Max: Fury Road', '2015-05-15', 8.1, 'In a post-apocalyptic wasteland, Max helps Furiosa escape a tyrant.', 1, 'https://image.tmdb.org/t/p/w500/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg'),
('Gladiator', '2000-05-05', 8.5, 'A Roman general seeks revenge after betrayal and enslavement.', 1, 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg'),
('John Wick', '2014-10-24', 7.4, 'An ex-hitman comes out of retirement to avenge his dog.', 1, 'https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg'),
('Parasite', '2019-05-30', 8.6, 'A poor family becomes entangled with a wealthy household.', 2, 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg'),
('The Shawshank Redemption', '1994-09-22', 9.3, 'Two imprisoned men bond over years, finding hope and eventual redemption.', 2, 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'),
('Forrest Gump', '1994-07-06', 8.8, 'The life journey of Forrest Gump, a man with a low IQ but a big heart.', 2, 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg'),
('The Notebook', '2004-06-25', 7.8, 'A young couple falls in love in the 1940s but faces many challenges.', 3, 'https://image.tmdb.org/t/p/w500/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg'),
('Pride & Prejudice', '2005-11-11', 7.8, 'Elizabeth Bennet and Mr. Darcy navigate class and pride in this romantic tale.', 3, 'https://image.tmdb.org/t/p/w500/klcA5XbJt9pg57k9t8NfU5E8XB0.jpg');

`;


async function main() {
    console.log("seeding...")
    const client = new Client({
        host: "localhost", 
        user: "mustapha",
        database: "inventory_application",
        password: "mustapha2003",
        port: 5432 
    })

    await client.connect();
    await client.query(SQL);
    await client.end();

    console.log("done")
}

main()


