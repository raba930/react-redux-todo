import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <li id={this.props.index} className="card-panel light-blue lighten-1">
                {this.props.value}
                <section className="controls">
                    <span className="complete" onClick={this.props.completeTodo} >
                        <i className="small material-icons"> done </i>
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
