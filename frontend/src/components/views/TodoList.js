import React, {Component} from 'react';
import Todos from '../elements/Todos';
import Button from '../elements/Button';
// TODO: solve .closest without jquery
import $ from 'jquery';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.addNewTodo = this.addNewTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.toggleCompletedTodos = this.toggleCompletedTodos.bind(this);
        this.removeCompletedTodos = this.removeCompletedTodos.bind(this);
    }
    addNewTodo() {
        let val = this.refs.todoInp.value;
        if (!val) return;
        this.props.addTodo(val);
        this.refs.todoInp.value = '';
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
        let filter = this.props.filter.filter === 'SHOW_ACTIVE' ? 'SHOW_ALL' : 'SHOW_ACTIVE';
        this.props.setFilter(filter);
    }
    removeCompletedTodos() {
        this.props.removeCompleted();
    }
    keyDown(ev) {
        let isEnter = ev.which === 13;
        if (isEnter) this.addNewTodo();
    }
    render() {
        const inputStyle = {
            width: '85%'
        };
        return (
            <div className="todoWrap">
                <input type="text" ref="todoInp" className="todoInput" placeholder="Todo text" onKeyPress={this.keyDown} style={inputStyle} />
                <Button right onClick={this.addNewTodo}>Add</Button>
                <Button control onClick={this.toggleCompletedTodos}>{this.props.filter.filter === 'SHOW_ALL' ? 'Hide' : 'Show'} completed todos</Button>
                <Button control right onClick={this.removeCompletedTodos}>Remove completed todos</Button>
                <Todos todos={this.props.todos.todos} filter={this.props.filter.filter} removeTodo={this.removeTodo} toggleComplete={this.toggleComplete}/>
            </div>
        );
    }
};

export default TodoList;
