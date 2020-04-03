import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { setPlayerPromptAnswer } from '../../gameController';
import { getPendingPlayers } from '../../utils';

export default function Prompt() {
    const { state, dispatch } = useStore();
    const { gameData, playerData } = state;
    const { topicData, promptAnswers, players } = gameData;
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    const answerSubmitted = !!promptAnswers[playerData.id];
    console.log('state: ', state);
    function handleSubmitAnswer() {
        // update game data with Player's answer
        setPlayerPromptAnswer({ playerId: playerData.id, answerId: selectedAnswer, gameData });
        // once answer submitted, disable button and set answered state
    }
    // we need to see who else hasn't answered
    // we need to disable button once answer submitted
    const disableSubmitBtn = !selectedAnswer || answerSubmitted;
    const pendingPlayers = getPendingPlayers(promptAnswers, players);
    console.log('pending players: ', pendingPlayers);

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
            <button onClick={ handleSubmitAnswer } disabled={ disableSubmitBtn }>Submit Answer</button>
            {!!pendingPlayers.length && <div>Just waiting on {pendingPlayers.join(', ')}!!!</div>}
        </div>
    );
}
