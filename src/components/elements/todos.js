import React, { Component } from 'react';
import Todo from '../elements/todo';

class App extends Component {
    render() {
        let todos = this.props.todos.map((todo, todoInd) => {
            return <Todo todo={todo} key={todoInd} index={todoInd} removeTodo={this.props.removeTodo} toggleComplete={this.props.toggleComplete} />;
        });
        return (
            <ul>
                {todos}
            </ul>
        );
    }
}

export default App;
