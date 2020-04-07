import React from 'react';
import styled from 'styled-components';

export default function Button(props) {
    const { children } = props;
    return (
        <StyledButton { ...props }>{children}</StyledButton>
    );
}

const StyledButton = styled.button.attrs(() => ({
    className: 'Styled-Button',
}))`
    border: none;
    background-color: #000000;
    color: #ffffff;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    height: 64px;
    width: 360px;
`;
