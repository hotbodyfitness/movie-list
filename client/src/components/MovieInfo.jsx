import React from 'react';
import $ from 'jquery';

var MovieInfo = ({ movies, title, index, truthy, watched, changeState }) => {
  var changeWatched = (e) => {
    var title = e.target.id;
    $.ajax({
      data: title,
      method: 'POST',
      url: '/watched',
      success: (title) => {
        changeState(title);
      }
    });
  };

  var img = { 'position': 'absolute', 'left': '150px' };
  var checkStyle = {'borderRadius': '50%'};

  var indexOfMov = () => {
    for (let i in movies) {
      if (movies[i].title === title) {
        return i;
      }
    }
  };
  var movie = movies[indexOfMov()];
  return (
    <div>
      {truthy() ? (
        <div>
          <p><b>Year: </b>{movie.year}<br /><b>Runtime: </b>{movie.runtime}<br /><b>IMDB Rating: </b>{movie.IMDBrating}</p>
          <b>Watched: </b>{watched ? (
            <input type="checkbox" style={checkStyle} key={index} id={title} onClick={changeWatched} checked></input>
          ) : (
              <input type="checkbox" style={checkStyle} key={index} id={title} onClick={changeWatched}></input>
            )}
          <img style={img} src={movie.image} />
        </div>
      ) : (
          <p hidden></p>
        )}
    </div>
  );
};

export default MovieInfo;