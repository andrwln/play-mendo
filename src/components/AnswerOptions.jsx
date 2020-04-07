import React, { useState } from 'react';
import styled from 'styled-components';
import AnswerOption from './AnswerOption';
import Button from './Button';

export default function AnswerOptions(props) {
    const { answers, handleSubmit } = props;
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    return (
        <StyledOptionsContainer>
            {answers.map((answer, answerIdx) => {
                return (
                    <AnswerOption
                        key={ `answer-option-${answerIdx}` }
                        option={ answer }
                        selectedAnswer={ selectedAnswer }
                        handleSelectOption={ setSelectedAnswer }
                    />
                );
            })}
            <Button className='fixedSubmitBtn' onClick={ () => handleSubmit(selectedAnswer) }>Submit Answer</Button>
        </StyledOptionsContainer>
    );
}

const StyledOptionsContainer = styled.div.attrs(() => ({
    className: 'Styled-OptionsContainer',
}))`
    display: flex;
    justify-content: space-between;
    flex-flow: wrap;
    width: 100%;
`;
