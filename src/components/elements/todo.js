import React from 'react';

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
    return (
        <li id={props.index} className={parsedClass}>
            {props.todo.text}
            <section className="controls">
                <span className="complete" onClick={props.toggleComplete} >
                    <i className="small material-icons"> {icon} </i>
                </span>
                <span className="remove" onClick={props.removeTodo} >
                    <i className="small material-icons"> delete </i>
                </span>
            </section>
        </li>
    );
};

export default Todo;
