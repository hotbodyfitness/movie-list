var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies', { useCreateIndex: true, useNewUrlParser: true });
mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => {console.log('SUCCESS connecting to MongoDB')});

var movieSchema = new mongoose.Schema({
  title: {type: String, unique: true},
  watched: Boolean,
  year: Number,
  IMDBrating: Number,
  runtime: String,
  image: String
});
movieSchema.path('title').index({unique: true});

var Movies = mongoose.model('Movies', movieSchema);

var save = (title, year, rating, runtime, image) => {
  var newMovie = new Movies({
    title: title,
    watched: false,
    year: year,
    IMDBrating: rating,
    runtime: runtime,
    image: image
  });
  return newMovie.save();
};

module.exports = {
  save,
  Movies
};