import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { incrementPlayerTurnIndex, setPlayerGuessAnswer } from '../../gameController';

export default function Guess() {
    const { state } = useStore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
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
    useEffect(() => {
        // whenever it's a new player's turn reset the form
        setSelectedAnswer(null);
    }, [playerTurnIndex]);
    // how many people are left to guess
    // once everybody has guessed, show results

    function submitGuess() {
        // send in answer
        setPlayerGuessAnswer({ playerId, focusedPlayerId, answerId: selectedAnswer, gameData });
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
        </div>
    );
}
