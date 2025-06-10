const express = require('express')
const app = express()

// import routers
const moviesRouter = require('./routes/moviesRouter')
const genresRouter = require('./routes/genresRouter')

app.get("/", (req ,res)=> res.send("explore view"))
app.use("/movies", moviesRouter);
app.use("/genres", genresRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`my port is listening on ${PORT}`)
})