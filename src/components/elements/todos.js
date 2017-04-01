import React from 'react';
import Todo from '../elements/todo';
import getVisibleTodos from '../../reducers/getVisibleTodos';

const Todos = ({ todos, filter, removeTodo, toggleComplete }) => {
    const visibleTodos = getVisibleTodos(todos, filter);
    const parsedTodos = visibleTodos.map((todo, todoInd) => {
        return <Todo todo={todo} key={todoInd} index={todoInd} removeTodo={removeTodo} toggleComplete={toggleComplete} />;
    });
    return (
        <ul>
            {parsedTodos}
        </ul>
    );
};

export default Todos;
