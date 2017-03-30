import React, { Component } from 'react';
import Todo from '../elements/todo';
import { connect } from 'react-redux';

const Todos = (props) => {
    let todos = props.todos.map((todo, todoInd) => {
        if (props.filter === 'ACTIVE' && todo.completed) return;

        return <Todo todo={todo} key={todoInd} index={todoInd} removeTodo={props.removeTodo} toggleComplete={props.toggleComplete} />;
    });
    return (
        <ul>
            {todos}
        </ul>
    );
}

export default Todos;
