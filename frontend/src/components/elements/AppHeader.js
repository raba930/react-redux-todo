import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
    height: 10vh
    margin-bottom: 2vh
`;
const H4 = styled.h4`
    margin: auto !important;
`;
export default ({children}) => {
    return (
        <Header className="light-blue accent-3 valign-wrapper">
            <H4 className="center-align">{children}</H4>
        </Header>
    );
};
