import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { setUserPromptAnswer } from '../../gameController';

export default function Prompt() {
    const { state, dispatch } = useStore();
    const { gameData } = state;
    const { topicData } = gameData;
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    console.log('state: ', state);
    function handleSubmitAnswer() {
        // update game data with user's answer
        
    }

    return (
        <div>
            this is the prompt page, yo
            Question: {topicData.topic}
            {topicData.answers.map((answer, idx) => {
                return (
                    <div key={ `answer-option-${idx}` }>
                        <input
                            type='radio'
                            name='prompt-answer'
                            id={ `answer-${answer.label}` }
                            value={ answer.id }
                            checked={ selectedAnswer === answer.id }
                            onChange={ e => setSelectedAnswer(e.currentTarget.value) }
                        />
                        <label>{answer.label}</label>
                    </div>
                );
            })}
            <button onClick={ handleSubmitAnswer }>Submit Answer</button>
        </div>
    );
}
