import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledPageContainer } from '../styles';
import { useStore } from '../../store/useStore';
import { setPlayerPromptAnswer, incrementGameStep } from '../../gameController';
import { getPendingPlayers } from '../../utils';
import AnswerOptions from '../../components/AnswerOptions';

export default function Prompt() {
    const { state, dispatch } = useStore();
    const { gameData, playerData } = state;
    const { topicData, promptAnswers, players } = gameData;
    const { answers, topic, description } = topicData;
    const [ selectedAnswer, setSelectedAnswer ] = useState(null);
    const answerSubmitted = !!promptAnswers[playerData.id];
    console.log('state: ', state);
    async function handleSubmitAnswer() {
        // update game data with Player's answer
        await setPlayerPromptAnswer({ playerId: playerData.id, answerId: selectedAnswer, gameData });
        console.log('pending players after setting prompt answer: ', pendingPlayers);
        if (pendingPlayers.length === 1) {
            setTimeout(() => {
                incrementGameStep({ gameData });
            }, 1000);
        }
        // once answer submitted, disable button and set answered state
    }
    // we need to see who else hasn't answered
    // we need to disable button once answer submitted
    const disableSubmitBtn = !selectedAnswer || answerSubmitted;
    const pendingPlayers = getPendingPlayers(promptAnswers, players);
    console.log('pending players: ', pendingPlayers);

    return (
        <PromptPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
                <div className='topicTitle'>{topic}</div>
            </div>
            <div className='mainSection'>
                <div className='topicDescription'>{description}</div>
                <AnswerOptions answers={ answers } handleSubmit={ handleSubmitAnswer } />
            </div>
        </PromptPageContainer>
        // <div>
        //     this is the prompt page, yo
        //     Question: {topicData.topic}
        //     {topicData.answers.map((answer, idx) => {
        //         return (
        //             <div key={ `answer-option-${idx}` }>
    // <input
    //     type='radio'
    //     name='prompt-answer'
    //     id={ `answer-${answer.label}` }
    //     value={ answer.id }
    //     checked={ selectedAnswer === answer.id }
    //     onChange={ e => setSelectedAnswer(e.currentTarget.value) }
    // />
        //                 <label>{answer.label}</label>
        //             </div>
        //         );
        //     })}
        //     <button onClick={ handleSubmitAnswer } disabled={ disableSubmitBtn }>Submit Answer</button>
        //     {!!pendingPlayers.length && <div>Just waiting on {pendingPlayers.join(', ')}!!!</div>}
        // </div>
    );
}

const PromptPageContainer = styled(StyledPageContainer)`
    .headerSection {
        display: flex;
        align-items: center;
        padding: 0 25px;
        img {
            width: 20%;
        }
        .topicTitle {
            font-size: 48px;
            font-weight: bold;
            padding: 10px 50px;
        }
    }
    .mainSection {
        display: flex;
        flex-direction: column;
        /* justify-content: space-evenly; */
        align-items: center;
        padding: 0 120px;
        .topicDescription {
            text-align: left;
            margin-bottom: 58px;
        }
    }
    .footerSection {
        /* font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: flex-end; */
    }
`;