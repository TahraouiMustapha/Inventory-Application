const express = require('express')
const path = require('path');
const app = express()

// import routers
const moviesRouter = require('./routes/moviesRouter')
const genresRouter = require('./routes/genresRouter')

// app configuration
app.set('views', path.join(__dirname, 'views'));   
app.set('view engine', 'ejs'); 

// serve static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// to parse form data
app.use(express.urlencoded({ extended: true }))

app.get("/", (req ,res)=> res.render("explore"))
app.use("/movies", moviesRouter);
app.use("/genres", genresRouter)




// error-handler middleware
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send(err.msg)
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`my port is listening on ${PORT}`)
})