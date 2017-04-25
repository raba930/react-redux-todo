import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
    height: 40vh !important
`;

export default ({innerRef, placeholder, defaultValue}) => {
    return (
        <Textarea ref={innerRef} defaultValue={defaultValue} className="materialize-textarea" placeholder={placeholder} />
    );
};
