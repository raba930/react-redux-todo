import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    white-space: normal;
    width: ${props => props.control ? '49%' : '15%'};
    float: ${props => props.right ? 'right' : 'left'};
    padding: ${props => props.comfort ? '0 15px!important' : '0 2px!important'};
    margin-${props => props.right ? 'left' : 'right'}: ${props => props.comfort ? '5px' : '0'};
`;

export default ({children, onClick, right, comfort, control}) => {
    return (
       <Button right={right} comfort={comfort} control={control} className="btn light-blue darken-4" onClick={onClick}>{children}</Button>
    );
};
