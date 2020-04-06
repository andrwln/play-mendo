import React from 'react';
import styled from 'styled-components';
import { keySpaceEnter } from '../utils';

export default function Checkbox(props) {
    const { handleChecked, isChecked } = props;
    function onClick() {
        handleChecked(!isChecked);
    }
    return (
        <StyledCheckbox onClick={ onClick } onKeyDown={ e => keySpaceEnter(e, onClick) }>
            {isChecked && <img src='/img/checkmark.svg' />}
        </StyledCheckbox>
    );
}

const StyledCheckbox = styled.div.attrs(() => ({
    className: 'Styled-Checkbox',
    tabIndex: '0',
}))`
    display: inline-block;
    width: 40px;
    height: 40px;
    box-sizing: border-box;
    border: 3px solid #000000;
    border-radius: 4px;
    cursor: pointer;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    /* &:hover {
        background-color: #f0f0f0;
    } */
    background-color: #ffffff;
    img {
        position: relative;
        left: 2px;
        bottom: 2px;
    }
`;
