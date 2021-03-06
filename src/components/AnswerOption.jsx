import React from 'react';
import styled, { css } from 'styled-components';
import { Checkbox } from './Checkbox';

export default function AnswerOption(props) {
    const { option, selectedAnswer, handleSelectOption } = props;
    const { label, description, id } = option;
    const isSelected = selectedAnswer === id;
    function handleChecked() {
        handleSelectOption(id);
    }
    return (
        <StyledAnswerOption isSelected={ isSelected } onClick={ handleChecked }>
            <div className='answerLabel'>
                <Checkbox isChecked={ isSelected } handleChecked={ handleChecked } />
                <input
                    style={ {display: 'none'} }
                    type='radio'
                    name='prompt-answer'
                    id={ `answer-${label}` }
                    value={ id }
                    checked={ isSelected }
                    onChange={ () => {} }
                />
                <label>{label}</label>
            </div>
            {description && <div className='answerDescription'>{description}</div>}
        </StyledAnswerOption>
    );
}

const StyledAnswerOption = styled.div.attrs(() => ({
    className: 'Styled-AnswerOption',
}))`
    width: 45%;
    text-align: left;
    margin-bottom: 36px;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid transparent;
    ${props => props.isSelected &&
    css`
        background: #E5E5E5;
        border: 1px solid #000000;
    `}
    .answerLabel {
        display: flex;
        align-items: center;
        padding-bottom: 15px;
        font-weight: bold;
        font-size: 24px;
        > label {
            cursor: pointer;
            margin-left: 30px;
        }
    }
`;
