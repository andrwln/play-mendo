import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { incrementPlayerTurnIndex, incrementGameStep, setPlayerGuessAnswer } from '../../gameController';
import { getRemainingGuessers } from '../../utils';

export default function Guess() {
    const { state } = useStore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    // const [guessingCompleted, setGuessingCompleted] = useState(false);
    const { playerData, gameData } = state;
    const { playerTurnIndex, players, topicData, guesses } = gameData;
    const { topic, answers } = topicData;
    const playerList = players && players.map(player => player.name);
    const focusedPlayer = players[playerTurnIndex];
    const playerId = playerData.id;
    const focusedPlayerId = focusedPlayer.id;
    const currentPlayerIsFocused = focusedPlayer.id === playerData.id;
    const guessesMap = guesses[focusedPlayerId] ? guesses[focusedPlayerId] : {};
    // we need track who has guessed already
    const completedGuessing = guessesMap[playerId];
    const guessersRemaining = guesses[focusedPlayerId] ? getRemainingGuessers(guesses, players, focusedPlayerId) : [];
    const guessingCompleted = guesses[focusedPlayerId] && guessersRemaining.length === 0;
    console.log('guessers remaining: ', guessersRemaining);
    useEffect(() => {
        // whenever it's a new player's turn reset the form
        setSelectedAnswer(null);
    }, [playerTurnIndex]);

    async function submitGuess() {
        // send in answer
        await setPlayerGuessAnswer({ playerId, focusedPlayerId, answerId: selectedAnswer, gameData });
    }
    function handleClickContinue() {
        if (playerTurnIndex < players.length -1) {
            incrementPlayerTurnIndex({ gameData });
        } else {
            incrementGameStep({ gameData });
        }
    }

    console.log('answers: ', answers);
    return (
        <div>
            <div>This is the guessing part of the game y'all with ID: {gameData.id}</div>

            {!currentPlayerIsFocused ?
                <div>
                    <div>It is {playerList[playerTurnIndex]}'s turn. Let's guess his answer y'all</div>
                    {playerList && <div>These are the players: {playerList.join(', ')} </div>}
                    {playerData && <div>HI THERE YOUR NAME IS <strong>{playerData.name}</strong> and you are GREAT</div>}
                    <div>
                        {answers.map((answer, idx) => {
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
                    </div>
                    <button onClick={ submitGuess } disabled={ completedGuessing }>Submit your guess!</button>
                </div>
                :
                <div>They're guessing your answer right now so just CHILL</div> }

            {guessingCompleted &&
            <div>
                DONE GUESSING, show results here:
                {playerData.isHost && <button onClick={ handleClickContinue }>Next Player</button>}
            </div>}
        </div>
    );
}
