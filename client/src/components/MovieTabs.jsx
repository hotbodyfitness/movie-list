import React from 'react';
import $ from 'jquery';
import MovieInfo from './MovieInfo.jsx';

var MovieTabs = ({ movies, filter, watched, changeState, movieDisplay, displayArr }) => {
  var watchedArray = [];
  var notWatchedArray = [];
  movies.forEach((e, i) => {
    if (e.watched) {
      watchedArray.push(e);
    } else {
      notWatchedArray.push(e);
    }
  });
  if (watched) {
    // var buttonStyle = { 'background': 'lightgreen', 'position': 'absolute', 'left': '120px' };
    var filtered = watchedArray.filter((each) => {
      if (each.title) {
        if (each.title.toLowerCase().includes(filter)) {
          return each;
        }
      }
    });
  } else {
    // var buttonStyle = { 'position': 'absolute', 'left': '120px' };
    var filtered = notWatchedArray.filter((each) => {
      if (each.title) {
        if (each.title.toLowerCase().includes(filter)) {
          return each;
        }
      }
    });
  }

  var truthy = (title) => {
    if (displayArr.includes(title)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {<div>
        {filtered.length ? filtered.map((e, i) => {
          return (<div><button key={i} onClick={() => {movieDisplay(e.title)}}>{e.title}</button>
            <div id={i}><MovieInfo movies={movies} title={e.title} watched={watched} changeState={changeState} index={i} truthy={() => (truthy(e.title))} /></div>
            {/* <button id={e.title} style={buttonStyle} onClick={changeWatched}>Watched</button> */}
          </div>
          )
        }) : <p>No movies by that name found</p>}
      </div>}
    </div>
  );
};

export default MovieTabs;