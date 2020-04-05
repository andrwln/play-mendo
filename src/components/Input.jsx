import React from 'react';
import styled from 'styled-components';

export default function Input(props) {
    const { placeholderText, handleInputChanged, value } = props;
    return (
        <StyledInput placeholder={ placeholderText } value={ value } onChange={ e => handleInputChanged(e.target.value) } />
    );
}

const StyledInput = styled.input.attrs(() => ({
    className: 'Styled-Input',
}))`
    height: 64px;
    width: 360px;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #000000;
    padding: 15px;
    font-size: 20px;
    line-height: 27px;
    margin-bottom: 16px;
`;
