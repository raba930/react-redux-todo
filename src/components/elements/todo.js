import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <li className="card-panel teal lighten-2">
                <input type="checkbox" id={this.props.index} onClick={this.props.removeTodo} />
                {this.props.value}
            </li>
        );
    }
}

export default App;
