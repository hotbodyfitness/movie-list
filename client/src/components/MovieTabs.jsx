import React from 'react';
import $ from 'jquery';

var MovieTabs = ({ movies, filter, watched, changeState }) => {
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
    var buttonStyle = { 'background': 'lightgreen', 'position': 'absolute', 'left': '120px' };
    var filtered = watchedArray.filter((each) => {
      if (each.title) {
        if (each.title.toLowerCase().includes(filter)) {
          return each;
        }
      }
    });
  } else {
    var buttonStyle = { 'position': 'absolute', 'left': '120px' };
    var filtered = notWatchedArray.filter((each) => {
      if (each.title) {
        if (each.title.toLowerCase().includes(filter)) {
          return each;
        }
      }
    });
  }

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

  return (
    <div>
      {<div>
        {filtered.length ? filtered.map((e, i) => {
          return (<div key={i}>{e.title}
            {/* <input type="radio" id={e.title} style={buttonStyle} onClick={changeWatched}></input> */}
            <button id={e.title} style={buttonStyle} onClick={changeWatched}>Watched</button>
          </div>
          )
        }) : <p>No movies by that name found</p>}
      </div>}
    </div>
  );
};

export default MovieTabs;