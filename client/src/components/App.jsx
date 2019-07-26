// This is where most of your work will be done
import React from 'react';
import $ from 'jquery';
import MovieTabs from './MovieTabs.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        { title: 'Mean Girls' },
        { title: 'Hackers' },
        { title: 'The Grey' },
        { title: 'Sunshine' },
        { title: 'Ex Machina' }
      ],
      filter: '',
      watched: false
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/movies',
      success: (result) => {
        if (result.length) {
          this.setState({
            movies: result,
            filter: '',
            watched: false
          });
        }
        document.getElementById('add').value = '';
      }
    });
  }

  changeState(title) {
    // console.log('from child:', title)
    $.ajax({
      method: 'GET',
      url: '/movies',
      success: (result) => {
        this.setState({
          movies: result
        });
        document.getElementById('add').value = '';
      }
    });
  }

  clickHandler() {
    var val = document.getElementById('input').value;
    if (val) {
      this.setState({
        filter: val.toLowerCase()
      });
    } else {
      this.setState({
        filter: ''
      });
    }
  }

  addClick() {
    var val = document.getElementById('add').value;
    this.makeFalse();
    $.ajax({
      method: 'POST',
      data: val,
      url: '/',
      success: (result) => {
        this.setState({
          movies: result
        });
        document.getElementById('add').value = '';
      }
    });
  }

  makeTrue() {
    $('#watched').css('background', 'lightgreen');
    $('#not').css('background', 'white');
    this.setState({ watched: true });
  }

  makeFalse() {
    $('#not').css('background', 'lightgreen');
    $('#watched').css('background', 'white');
    this.setState({ watched: false });
  }

  render() {
    var { movies, filter, watched } = this.state;
    var style = { "background": "lightgreen" };
    return (
      <div>
        <h1>Movie List</h1>
        <input type="search" placeholder="Add movie title here" id="add"></input>
        <button onClick={this.addClick.bind(this)}>Add</button><br />
        <input type="search" placeholder="Search..." id="input"></input>
        <button onClick={this.clickHandler.bind(this)}>Go!</button><br />
        <button id="watched" onClick={this.makeTrue.bind(this)}>Watched</button>
        <button id="not" style={style} onClick={this.makeFalse.bind(this)}>To Watch</button>
        <MovieTabs movies={movies} filter={filter} watched={watched} changeState={this.changeState.bind(this)} />
      </div>
    )
  }
}

export default App;