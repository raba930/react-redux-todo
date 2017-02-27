import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <li>
                <input type="checkbox" id={this.props.index} onClick={this.props.removeTodo} />
                {this.props.value}
            </li>
        );
    }
}

export default App;
