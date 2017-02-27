import React, { Component } from 'react';
import TodoList from './views/todoList';
import '../stylesheet/App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TodoList />
            </div>
        );
    }
}

export default App;
