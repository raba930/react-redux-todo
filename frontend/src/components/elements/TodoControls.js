import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Section = styled.section`
    float: right;
`;
const spanDefault = `
    cursor: pointer;
    color: white;
`;
const CompleteSpan = styled.span`
    ${spanDefault}
    & i:hover {
        color: #1b5e20;
    }
`;
const InfoSpan = styled.span`
    ${spanDefault}
    & a i {
        color: white;
    }
    & i:hover {
        color: #01579b;
    }
`;
const RemoveSpan = styled.span`
    ${spanDefault}
    & i:hover {
        color: #b71c1c;
    }
`;

export default ({toggleComplete, todoInfo, removeTodo, completed, id}) => {
    const infoLink = '/details/' + id;
    let icon;
    completed ? icon = 'restore' : icon = 'done';
    return (
       <Section className="controls">
            <CompleteSpan onClick={toggleComplete} >
                <i className="small material-icons complete">{icon}</i>
            </CompleteSpan>
            <InfoSpan onClick={todoInfo} >
                <Link to={infoLink}>
                    <i className="small material-icons info">info_outline</i>
                </Link>
            </InfoSpan>
            <RemoveSpan onClick={removeTodo} >
                <i className="small material-icons remove">delete</i>
            </RemoveSpan>
       </Section>
    );
};
