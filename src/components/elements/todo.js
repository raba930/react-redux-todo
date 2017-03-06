import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <li className="card-panel light-blue lighten-1">
                {this.props.value}
                <span className="remove" id={this.props.index} onClick={this.props.removeTodo} > X </span>
            </li>
        );
    }
}

export default App;
