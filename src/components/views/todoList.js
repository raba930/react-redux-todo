import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todos from '../elements/todos';
import * as todoActions from '../../actions/todo';
// TODO: solve .closest without jquery
import $ from 'jquery';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        }
        this.addNewTodo = this.addNewTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }
    addNewTodo() {
        if (!this.state.inputVal) return;
        this.props.addTodo(this.state.inputVal);
        this.setState({inputVal: ''});
    }
    removeTodo(ev) {
        let id =  $(ev.target).closest('li').attr('id');
        this.props.removeTodo(id);
    }
    updateInput(ev) {
        let value = ev.target.value;
        this.setState({
            inputVal: value
        })
    }
    keyDown(ev) {
        let isEnter = ev.which === 13;
        if (isEnter) this.addNewTodo();
    }
    render() {
        return (
            <div className="todoWrap">
                <input type="text" value={this.state.inputVal} className="todoInput" placeholder="Todo text" onChange={this.updateInput} onKeyPress={this.keyDown} />
                <button className="btn light-blue darken-4" onClick={this.addNewTodo}>Add todo</button>
                <Todos todos={this.props.todos} removeTodo={this.removeTodo}/>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return state.todo;
}
function mapDispatchToProps(dispatch) {
    return {
        addTodo: todo => dispatch(todoActions.addTodo(todo)),
        removeTodo: id => dispatch(todoActions.removeTodo(Number(id)))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
