import React from 'react';
import { Link } from 'react-router-dom';

const Todo = (props) => {
    let parsedClass = 'card-panel';
    let icon = 'done';
    if (props.todo.completed) {
        parsedClass += ' light-green lighten-1';
        icon = 'restore';
    } else {
        parsedClass += ' light-blue lighten-1';
        icon = 'done';
    }
    const infoLink = '/details/' + props.index;
    return (
        <li id={props.index} className={parsedClass}>
            <span className="todo-text">
                {props.todo.text}
            </span>
            <section className="controls">
                <span className="complete" onClick={props.toggleComplete} >
                    <i className="small material-icons">{icon}</i>
                </span>
                <span className="info" onClick={props.todoInfo} >
                    <Link to={infoLink}>
                        <i className="small material-icons">info_outline</i>
                    </Link>
                </span>
                <span className="remove" onClick={props.removeTodo} >
                    <i className="small material-icons">delete</i>
                </span>
            </section>
        </li>
    );
};

export default Todo;
