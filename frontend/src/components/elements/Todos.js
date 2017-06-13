import React from 'react';
import Todo from '../elements/Todo';
import getVisibleTodos from '../../reducers/getVisibleTodos';
import styled from 'styled-components';

const TodosList = styled.ul`
    margin-top: 5vh;
`;

const Todos = ({ todos, filter, removeTodo, toggleComplete }) => {
    const visibleTodos = getVisibleTodos(todos, filter);
    const parsedTodos = visibleTodos.map((todo, ind) => {
        return <Todo todo={todo} key={ind} removeTodo={removeTodo} toggleComplete={toggleComplete} />;
    });
    return (
        <TodosList>
            {parsedTodos}
        </TodosList>
    );
};

export default Todos;
