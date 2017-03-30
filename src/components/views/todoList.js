import React, { Component } from 'react';
import { connect } from 'react-redux';
import Todos from '../elements/todos';
import * as todoActions from '../../actions/todo';
// TODO: solve .closest without jquery
import $ from 'jquery';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        };
        this.addNewTodo = this.addNewTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.toggleCompletedTodos = this.toggleCompletedTodos.bind(this);
        this.removeCompletedTodos = this.removeCompletedTodos.bind(this);
    }
    addNewTodo() {
        if (!this.state.inputVal) return;
        this.props.addTodo(this.state.inputVal);
        this.setState({inputVal: ''});
    }
    removeTodo(ev) {
        let id = $(ev.target).closest('li').attr('id');
        this.props.removeTodo(id);
    }
    toggleComplete(ev) {
        let id = $(ev.target).closest('li').attr('id');
        this.props.toggleComplete(id);
    }
    toggleCompletedTodos() {
        let filter = this.props.filter.filter === 'ACTIVE' ? 'ALL' : 'ACTIVE';
        this.props.setFilter(filter);
    }
    removeCompletedTodos() {
        this.props.removeCompleted();
    }
    updateInput(ev) {
        let value = ev.target.value;
        this.setState({
            inputVal: value
        });
    }
    keyDown(ev) {
        let isEnter = ev.which === 13;
        if (isEnter) this.addNewTodo();
    }
    render() {
        return (
            <div className="todoWrap">
                <input type="text" value={this.state.inputVal} className="todoInput" placeholder="Todo text" onChange={this.updateInput} onKeyPress={this.keyDown} />
                <button className="btn light-blue darken-4 addBtn" onClick={this.addNewTodo}>Add</button>
                <button className="btn light-blue darken-4 controlBtn filter" onClick={this.toggleCompletedTodos}>{this.props.filter.filter === 'ALL' ? 'Hide' : 'Show'} completed todos</button>
                <button className="btn light-blue darken-4 controlBtn remove" onClick={this.removeCompletedTodos}>Remove completed todos</button>
                <Todos todos={this.props.todos.todos} filter={this.props.filter.filter} removeTodo={this.removeTodo} toggleComplete={this.toggleComplete}/>
            </div>
        );
    }
}

function mapStateToProps(state, prop) {
    return {
        todos: state.todo,
        filter: state.filter
    };
}
function mapDispatchToProps(dispatch) {
    return {
        addTodo: todo => dispatch(todoActions.addTodo(todo)),
        removeTodo: id => dispatch(todoActions.removeTodo(Number(id))),
        toggleComplete: id => dispatch(todoActions.toggleComplete(Number(id))),
        removeCompleted: () => dispatch(todoActions.removeCompleted()),
        setFilter: filter => dispatch(todoActions.setFilter(filter))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
