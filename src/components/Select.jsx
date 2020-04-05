import React from 'react';
import styled from 'styled-components';

export default function Select(props) {
    const { options, name, placeholderText, handleOptionSelected } = props;
    function handleOnChange(e) {
        console.log('handle selected with val: ', e.target.value);
    }
    return (
        <StyledSelect onChange={ handleOnChange } defaultValue=''>
            <option value=''>{placeholderText}</option>
            {options.map((option, idx) => {
                return <option value={ option.id } key={ `${name}-select-${idx}` }>{option.topic}</option>;
            })}
        </StyledSelect>
    );
}

const StyledSelect = styled.select.attrs(() => ({
    className: 'Styled-Select',
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
    background-color: #ffffff;
    cursor: pointer;


    /* remove browser default arrow */
   -o-appearance: none;
   -ms-appearance: none;
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
`;
