var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/movies', { useCreateIndex: true, useNewUrlParser: true });
// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => {console.log('SUCCESS connecting to MongoDB')});

// mongoose.Promise = require('bluebird');
// assert.equal(query.exec().constructor, require('bluebird'));
// // Use q. Note that you **must** use `require('q').Promise`.
// mongoose.Promise = require('q').Promise;
// assert.ok(query.exec() instanceof require('q').makePromise);

var movieSchema = new mongoose.Schema({
  title: {type: String, unique: true},
  watched: Boolean,
  year: Number,
  IMDBrating: Number, // or Decimal128 ??
  runtime: String
});
movieSchema.path('title').index({unique: true});

var Movies = mongoose.model('Movies', movieSchema);

var save = (title) => {
  var newMovie = new Movies({
    title: title,
  });
  return newMovie.save();
};

module.exports = {
  save,
  Movies
};