import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { incrementPlayerTurnIndex, incrementGameStep, setPlayerGuessAnswer } from '../../gameController';
import { getRemainingGuessers, getGuessesByPopularity, getItemByIdFromArr, getResultsMessage, getTopGroupGuess } from '../../utils';
import { StyledPageContainer } from '../styles';
import AnswerOptions from '../../components/AnswerOptions';
import PendingPlayers from '../../components/PendingPlayers';
import PlayerIcon from '../../components/PlayerIcon';
import ResultsBreakdownItem from '../../components/ResultsBreakdownItem';
import Button from '../../components/Button';

export default function Guess() {
    const { state } = useStore();
    const { playerData, gameData } = state;
    const { playerTurnIndex, players, topicData, guesses, promptAnswers, iconData } = gameData;
    const { topic, answers } = topicData;
    const playerList = players && players.map(player => player.name);
    const focusedPlayer = players[playerTurnIndex];
    const playerId = playerData.id;
    const focusedPlayerId = focusedPlayer.id;
    const currentPlayerIsFocused = focusedPlayer.id === playerData.id;
    const guessesMap = guesses[focusedPlayerId] ? guesses[focusedPlayerId] : {};
    // we need track who has guessed already
    const userCompletedGuessing = guessesMap[playerId] || currentPlayerIsFocused;
    const guessersRemaining = guesses[focusedPlayerId] ? getRemainingGuessers(guesses, players, focusedPlayerId) : [];
    const allGuessingCompleted = guesses[focusedPlayerId] && guessersRemaining.length === 0;
    const hasNextPlayer = playerTurnIndex < players.length - 1;
    console.log('guessers remaining: ', guessersRemaining);

    function submitGuess(answerId) {
        // send in answer
        setPlayerGuessAnswer({ playerId, focusedPlayerId, answerId, gameData });
    }
    function handleClickContinue() {
        if (hasNextPlayer) {
            incrementPlayerTurnIndex({ gameData });
        } else {
            incrementGameStep({ gameData });
        }
    }
    const guessingPlayers = players.filter(player => player.id !== focusedPlayer.id);
    const showWaitingDisplay = !allGuessingCompleted && currentPlayerIsFocused;
    const showGuessingDisplay = !showWaitingDisplay && !userCompletedGuessing && !allGuessingCompleted;
    const showPendingDisplay = !allGuessingCompleted && userCompletedGuessing;
    const showResults = allGuessingCompleted;
    const showNextButton = playerData.isHost && (showResults || showWaitingDisplay ||showPendingDisplay) ;

    console.log('answers: ', answers);
    return (
        <GuessPageContainer>
            <div className='headerSection'>
                <div className='logoContainer'><img src='/img/logo.svg' /></div>
                <div className='topicTitle'>{topic}</div>
            </div>
            <div className='mainSection'>
                {showWaitingDisplay && <WaitingDisplay />}
                {showGuessingDisplay &&
                <GuessingDisplay
                    focusedPlayer={ focusedPlayer }
                    answers={ answers }
                    submitGuess={ submitGuess }
                />}
                {showPendingDisplay && <PendingPlayers submittedAnswers={ guessesMap } players={ guessingPlayers } iconData={ iconData } />}
                {showResults &&
                <ResultsDisplay
                    focusedPlayer={ focusedPlayer }
                    promptAnswers={ promptAnswers }
                    guesses={ guessesMap }
                    players={ players }
                    topicData={ topicData }
                    iconData={ iconData }
                />}
            </div>
            {showNextButton &&
            <Button
                className='fixedSubmitBtn'
                onClick={ handleClickContinue }
            >
                {hasNextPlayer ? 'Next Player' : 'Results'}
            </Button>}
        </GuessPageContainer>
    );
}

function WaitingDisplay() {
    return (
        <>
            <img className='smileyFace' src='/img/smileyface.svg' />
            <div className='waitingMessage'>Sit tight and relax, let's see how well your friends know you. When everyone submits their guess or when the host ends the round, you will be taken to the next page.</div>
        </>
    );
}

function GuessingDisplay({ focusedPlayer, submitGuess, answers}) {
    return (
        <>
            <div className='topicDescription'>How would <strong>{focusedPlayer.name}</strong> answer the question?</div>
            <AnswerOptions answers={ answers } handleSubmit={ submitGuess } />
        </>
    );
}

function ResultsDisplay({ focusedPlayer, promptAnswers, guesses, players, topicData, iconData }) {
    const answerOptions = topicData.answers;
    const focusedPlayerAnswerId = promptAnswers[focusedPlayer.id];
    const focusedPlayerAnswer = getItemByIdFromArr(answerOptions, focusedPlayerAnswerId);
    const guessBreakdown = getGuessesByPopularity(guesses);
    const topGroupAnswer = getTopGroupGuess(guessBreakdown, answerOptions);
    const { characters, colors } = iconData;
    const focusedPlayerInGuesses = getItemByIdFromArr(guessBreakdown, focusedPlayerAnswerId);
    const resultsMessage = getResultsMessage(focusedPlayerInGuesses, topGroupAnswer, focusedPlayer);

    console.log('guess breakdown: ', guessBreakdown);
    console.log('most populer guesses: ', topGroupAnswer);
    // check if focusedplayer answer exists in the guess breakdown
    // if it does, display as ordered in array and show focused player icon to left of answer
    // if it does not, above the guess breakdowns, show focused player's answer
    return (
        <GuessBreakdownResults>
            <div className='resultsMessage'>
                {resultsMessage}
            </div>
            <div className='resultsBreakdown'>
                {!focusedPlayerInGuesses &&
                <ResultsBreakdownItem
                    focusedPlayer={ focusedPlayer }
                    guessData={ { id: focusedPlayerAnswerId, playerIds: [] } }
                    players={ players }
                    iconData={ iconData }
                    answers={ answerOptions }
                    isCorrectAnswer
                />}
                {guessBreakdown.map((guess, guessIdx) => {
                    const isFocusedPlayerAnswer = guess.id === focusedPlayerAnswerId;
                    return (
                        <ResultsBreakdownItem
                            key={ `breakdown-item-${guessIdx}` }
                            focusedPlayer={ focusedPlayer }
                            guessData={ guess }
                            players={ players }
                            iconData={ iconData }
                            answers={ answerOptions }
                            isCorrectAnswer={ isFocusedPlayerAnswer }
                        />
                    );
                })}
            </div>
        </GuessBreakdownResults>
    );
}

const GuessPageContainer = styled(StyledPageContainer)`
    .headerSection {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 25px;
        .logoContainer {
            width: 30%;
            img {
                max-width: 225px;
            }
        }
        .topicTitle {
            font-size: 32px;
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
            text-align: center;
            margin-bottom: 58px;
        }
        .smileyFace {
            max-width: 150px;
            width: 20%;
            margin-bottom: 20px;
        }
        .waitingMessage {
            margin-bottom: 20px;
            font-size: 26px;
            line-height: 45px;
        }
        .resultsMessage {
            margin-bottom: 30px;
        }
        .resultsBreakdown {
            display: flex;
            flex-direction: column;
        }
    }
    .footerSection {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const GuessBreakdownResults = styled.div.attrs(() => ({
    className: 'Styled-BreakdownResults',
}))`
    
`;
