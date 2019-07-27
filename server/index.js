var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var save = require('../mongooseSchema.js').save;
var Movies = require('../mongooseSchema.js').Movies;
var API_KEY = require('../config.js').API_KEY;
var rp = require('request-promise');
var db = require('../mySQLconnection.js').db;

app.listen('3000', () => { console.log('Running on port 3000') });

// the first arg '/', isn't nessesary but shows how the routing works
app.use('/', express.static(__dirname + '/../public/dist')); // notice the /../ !!!

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
var titleName;

app.post('/', (req, res) => {
  var title = Object.keys(req.body)[0];
  titleName = title;
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

        // for mySQL
        var queryString = `INSERT INTO info (title, runtime, year, IMDBrating, image) VALUES (?, ?, ?, ?, ?)`;
        var queryArgs = [title, movie.runtime, year, movie.vote_average, image];
        db.query(queryString, queryArgs, (err, result) => {
          if (err) {
            console.log('ERROR from POST /:', err);
            res.end();
          } else {
            console.log('res from POST /', result);
            res.redirect('/movies');
          }
        });

           // The following 4 lines are for MongoDB
        // save(title, year, movie.vote_average, movie.runtime, image)
        //   .then((result) => {
        //      res.redirect('/movies');
        //   })
        //   .catch((err) => { console.log('CATCH ERROR:', err) });
      }
    });
});

app.get('/movies', (req, res) => {
  db.query(`SELECT * FROM info`, [], (err, result) => {
    if (err) {
      console.log('ERROR from GET /movies:', err);
      res.end();
    } else {
      console.log('res from GET /movies', result);
      res.send(result);
    }
  });

    // The following line is for MongoDB
  // Movies.find().then((results) => { res.send(results); });
});

app.post('/watched', (req, res) => {
  var body = Object.keys(req.body)[0];
  var watchedOrNot;
  console.log('BODY WATCHED', body);
  db.query(`SELECT watched FROM info WHERE title IN ('${body}')`, [], (err, result) => {
    if (err) {
      console.log('ERROR from POST /watched:', err);
      res.end();
    } else {
      console.log('res from POST /watched', result);
      if (result === null) {
        watchedOrNot = 0;
      } else {
        watchedOrNot = Object.values(result)[0].watched;
      }
      console.log('watchedOrNot from POST /watched', watchedOrNot);
      db.query(`UPDATE info SET watched=${watchedOrNot ? 0 : 1} WHERE title IN ('${body}')`, [], (err, result) => {
        if (err) {
          console.log('ERROR from UPDATING /watched:', err);
          res.end();
        } else {
          console.log('res from UPDATING /watched', result);
          res.send(result.title);
        }
      });
    }
  });


    // The following 7 lines are for MongoDB
  // Movies.find({ title: body })
  //   .then((result) => {
  //     watchedOrNot = result[0].watched;
  //     Movies.findOneAndUpdate(
  //       { title: body }, { $set: { watched: (watchedOrNot ? false : true) } }, { upsert: true, returnNewDocument: true })
  //       .then((result) => { console.log(result); res.send(result.title) });
  //   });

});