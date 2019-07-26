var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var save = require('../mongooseSchema.js').save;
var Movies = require('../mongooseSchema.js').Movies;

app.listen('8080', () => {console.log('Running on port 8080')});

// the first arg '/' isn't nessesary but shows how to route
app.use('/', express.static(__dirname + '/../public/dist')); // notice the /../ !!!

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  var body = Object.keys(req.body)[0];
  // console.log(body);
  save(body)
    .then((result) => {
      Movies.find().then((results) => {res.send(results);});
      // res.redirect('/');
    })
    .catch((err) => {console.log(err)});

});
app.get('/', (req, res) => {
  console.log('hitting GET');


  // console.log('typeof REQ.body:', typeof req.body);
  res.end();
});