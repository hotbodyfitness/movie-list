var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var save = require('../mongooseSchema.js').save;
var Movies = require('../mongooseSchema.js').Movies;

app.listen('8080', () => { console.log('Running on port 8080') });

// the first arg '/' isn't nessesary but shows how to route
app.use('/', express.static(__dirname + '/../public/dist')); // notice the /../ !!!

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  var body = Object.keys(req.body)[0];
  // console.log(body);
  save(body)
    .then((result) => {
      res.redirect('/movies');
    })
    .catch((err) => { console.log(err) });
});

app.get('/movies', (req, res) => {
  Movies.find().then((results) => { res.send(results); });
});

app.post('/watched', (req, res) => {
  var body = Object.keys(req.body)[0];
  var watchedOrNot;
  Movies.find({title: body})
  .then((result) => {
    watchedOrNot = result[0].watched;
    Movies.findOneAndUpdate(
      {title: body}, {$set: {watched: (watchedOrNot ? false : true)}}, {upsert: true, returnNewDocument: true})
      .then((result) => {console.log(result); res.send(result.title)});
  });

});