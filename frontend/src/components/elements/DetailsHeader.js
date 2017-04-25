import React from 'react';
import styled from 'styled-components';

const I = styled.section`
    float: right;
`;
export default ({text, completed}) => {
    return (
        <h3>
            <span className="todo-text">{text}</span>
            {completed && <I className="small material-icons">done</I>}
        </h3>
    );
};
