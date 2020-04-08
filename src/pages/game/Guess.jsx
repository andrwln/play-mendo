import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { incrementPlayerTurnIndex, incrementGameStep, setPlayerGuessAnswer } from '../../gameController';
import { getRemainingGuessers, getMostPopularGuess, getItemByIdFromArr, getTopGroupGuess } from '../../utils';
import { StyledPageContainer } from '../styles';
import AnswerOptions from '../../components/AnswerOptions';
import PendingPlayers from '../../components/PendingPlayers';
import PlayerIcon from '../../components/PlayerIcon';
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
                <img src='/img/logo.svg' />
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
                {hasNextPlayer ? 'Next Player' : 'See Results'}
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
    const guessBreakdown = getMostPopularGuess(guesses);
    console.log('guess breakdown: ', guessBreakdown);
    const topGroupAnswer = getTopGroupGuess(guessBreakdown, answerOptions);
    const { characters, colors } = iconData;
    console.log('most populer guesses: ', topGroupAnswer);
    return (
        <>
            <div>{focusedPlayer.name} chose {focusedPlayerAnswer.label}</div>
            <div>As a group, you thought {focusedPlayer.name} chose {topGroupAnswer}</div>
            <div>
                {guessBreakdown.map((guess, idx) => {
                    const answerLabel = getItemByIdFromArr(answerOptions, guess.answerId).label;
                    const characterIcon = characters[idx];
                    const characterColor = colors[idx];
                    return (
                        <div key={ `guess-breakdown-${idx}` }>
                            <span>{answerLabel}</span>
                            <div>
                                {guess.playerIds.map((id, index) => {
                                    const playerName = getItemByIdFromArr(players, id).name;
                                    return (
                                        <PlayerIcon
                                            key={ `player-icon-${index}` }
                                            isActive playerName={ playerName }
                                            icon={ characterIcon }
                                            color={ characterColor }
                                        />);
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

const GuessPageContainer = styled(StyledPageContainer)`
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
        align-items: center;
        padding: 0 120px;
        .topicDescription {
            text-align: center;
            margin-bottom: 58px;
        }
        .smileyFace {
            width: 20%;
        }
        .waitingMessage {
            font-size: 26px;
            line-height: 45px;
        }
    }
    .footerSection {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
