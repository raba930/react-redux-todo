import React from 'react';

export default ({children, completed, id}) => {
    let parsedClass = 'card-panel';
    if (completed) {
        parsedClass += ' light-green lighten-1';
    } else {
        parsedClass += ' light-blue lighten-1';
    }
    return (
        <li className={parsedClass} id={id}>{children}</li>
    );
};
