import React from 'react';
import TodoListItem from './TodoListItem';
import TodoText from './TodoText';
import TodoControls from './TodoControls';

const Todo = (props) => {
    return (
        <TodoListItem completed={props.todo.completed} id={props.todo._id}>
            <TodoText>{props.todo.text}</TodoText>
            <TodoControls
                toggleComplete={props.toggleComplete}
                todoInfo={props.todoInfo}
                removeTodo={props.removeTodo}
                completed={props.todo.completed}
                index={props.index}
            >
            </TodoControls>
        </TodoListItem>
    );
};

export default Todo;
