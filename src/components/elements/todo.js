import React, { Component } from 'react';

class App extends Component {
    render() {
        let parsedClass = 'card-panel';
        let icon = 'done';
        if (this.props.todo.completed) {
            parsedClass += ' light-green lighten-1';
            icon = 'restore';
        } else {
            parsedClass += ' light-blue lighten-1';
            icon = 'done';
        }
        return (
            <li id={this.props.index} className={parsedClass}>
                {this.props.todo.text}
                <section className="controls">
                    <span className="complete" onClick={this.props.toggleComplete} >
                        <i className="small material-icons"> {icon} </i>
                    </span>
                    <span className="remove" onClick={this.props.removeTodo} >
                        <i className="small material-icons"> delete </i>
                    </span>
                </section>
            </li>
        );
    }
}

export default App;
