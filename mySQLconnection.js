var mysql = require('mysql');
var db = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'movies'
});
db.connect(() => {console.log('Connected to MySQL')});

module.exports = { db };