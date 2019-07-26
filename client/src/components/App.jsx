// This is where most of your work will be done
import React from 'react';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [
        {title: 'Mean Girls'},
        {title: 'Hackers'},
        {title: 'The Grey'},
        {title: 'Sunshine'},
        {title: 'Ex Machina'}
      ],
      filter: ''
    }
  }

  clickHandler() {
    var val = document.getElementById('input').value.toLowerCase();
    this.setState({
      filter: val
    });
  }

  addClick() {
    var val = document.getElementById('add').value;
    $.ajax({
      method: 'POST',
      data: val,
      url: '/',
      success: (result) => {
        this.setState({
          movies: result
        });
        // console.log('SUCCESSFUL AJAX POST:', result);
        document.getElementById('add').value = '';
      }
    });
  }

  render() {
    var { movies, filter } = this.state;
    var filtered = movies.filter((each) => {
      if (each.title.toLowerCase().includes(filter)) {
        return each;
      }
    });
    return (
      <div>
        <h1>Movie List</h1>
        <input type="search" placeholder="Add Movie..." id="add"></input>
        <button onClick={this.addClick.bind(this)}>Add</button><br />
        <input type="search" placeholder="Search..." id="input"></input>
        <button onClick={this.clickHandler.bind(this)}>Go</button>
        <div id="searched">
        {filtered.length ? filtered.map((e, i) => {
          return (<p key={i}>{e.title}<br /></p>)
        }) : <p>no movie by that name found</p>}</div>
      </div>
    )
  }
}

export default App;