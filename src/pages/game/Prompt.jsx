import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledPageContainer } from '../styles';
import { useStore } from '../../store/useStore';
import { setPlayerPromptAnswer, incrementGameStep } from '../../gameController';
import { getPendingPlayers } from '../../utils';
import AnswerOptions from '../../components/AnswerOptions';
import PendingPlayers from '../../components/PendingPlayers';
import Button from '../../components/Button';

export default function Prompt() {
    const { state, dispatch } = useStore();
    const { gameData, playerData } = state;
    const { topicData, promptAnswers, players, iconData} = gameData;
    const { answers, topic, description } = topicData;
    const answerSubmitted = !!promptAnswers[playerData.id];
    async function handleSubmitAnswer(answerId) {
        // update game data with Player's answer
        await setPlayerPromptAnswer({ playerId: playerData.id, answerId, gameData });
        if (pendingPlayers.length === 1) {
            setTimeout(() => {
                incrementGameStep({ gameData });
            }, 500);
        }
        // once answer submitted, disable button and set answered state
    }
    // we need to see who else hasn't answered
    // we need to disable button once answer submitted
    const pendingPlayers = getPendingPlayers(promptAnswers, players);
    const showForceProceed = answerSubmitted && playerData.isHost;

    return (
        <PromptPageContainer>
            <div className='headerSection'>
                <div className='logoContainer'><img src='/img/logo.svg' /></div>
                <div className='topicTitle'>{topic}</div>
            </div>
            <div className='mainSection'>
                <div className='topicDescription'>{description}</div>
                {!answerSubmitted ?
                    <AnswerOptions answers={ answers } handleSubmit={ handleSubmitAnswer } />
                    :
                    <PendingPlayers submittedAnswers={ promptAnswers } players={ players } iconData={ iconData } />}
            </div>
            {/* {showForceProceed &&
            <div className='footerSection'>
                <Button
                    onClick={ () => incrementGameStep({ gameData }) }
                >
                    Host force proceed
                </Button>
            </div>} */}
        </PromptPageContainer>
    );
}

const PromptPageContainer = styled(StyledPageContainer)`
    .headerSection {
        display: flex;
        align-items: center;
        padding: 0 25px;
        .logoContainer {
            width: 30%;
            img {
                max-width: 225px;
            }
        }
        .topicTitle {
            font-size: 36px;
            font-weight: bold;
            padding: 10px 50px;
        }
    }
    .mainSection {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 120px;
        .topicDescription {
            text-align: left;
            margin-bottom: 58px;
        }
    }
    .footerSection {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;