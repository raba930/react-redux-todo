import React, { Component } from 'react';
import '../stylesheet/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Enter new todo item"/>
      </div>
    );
  }
}

export default App;
