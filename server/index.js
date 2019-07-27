var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var save = require('../mongooseSchema.js').save;
var Movies = require('../mongooseSchema.js').Movies;
var API_KEY = require('../config.js').API_KEY;
var rp = require('request-promise');

app.listen('3000', () => { console.log('Running on port 3000') });

// the first arg '/', isn't nessesary but shows how the routing works
app.use('/', express.static(__dirname + '/../public/dist')); // notice the /../ !!!

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  var title = Object.keys(req.body)[0];
  // request(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`, (err, res, body) => {
  rp(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${title}`)
    .then((result) => {
      if (result) {
        var movie = JSON.parse(result).results;
        if (Array.isArray(movie)) {
          movie = movie[0];
        }
        var year = movie.release_date.slice(0, 4);
        var image = `https://image.tmdb.org/t/p/w185${movie.poster_path}`;
        /* release_date (first 4 chars = Year)
           runtime
           vote_average (IMDB Rating)
           (image = ) `https://image.tmdb.org/t/p/w185` + poster_path */
        save(title, year, movie.vote_average, movie.runtime, image)
          .then((result) => {
             res.redirect('/movies');
          })
          .catch((err) => { console.log('CATCH ERROR:', err) });
      }
    });
});

app.get('/movies', (req, res) => {
  Movies.find().then((results) => { res.send(results); });
});

app.post('/watched', (req, res) => {
  var body = Object.keys(req.body)[0];
  var watchedOrNot;
  Movies.find({ title: body })
    .then((result) => {
      watchedOrNot = result[0].watched;
      Movies.findOneAndUpdate(
        { title: body }, { $set: { watched: (watchedOrNot ? false : true) } }, { upsert: true, returnNewDocument: true })
        .then((result) => { console.log(result); res.send(result.title) });
    });

});