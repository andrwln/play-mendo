import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { incrementPlayerTurnIndex, setPlayerGuessAnswer } from '../../gameController';

export default function Lobby() {
    const { state } = useStore();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    console.log('state in lobby: ', state);
    const { playerData, gameData } = state;
    const { playerTurnIndex, players, topicData, id: gameId } = gameData;
    const { topic, answers } = topicData;
    const playerList = players && players.map(player => player.name);
    const focusedPlayer = players[playerTurnIndex];
    const playerId = playerData.id;
    const focusedPlayerId = focusedPlayer.id;

    const currentPlayerIsFocused = focusedPlayer.id === playerData.id;
    // we need track who has guessed already
    // how many people are left to guess
    // once everybody has guessed, show results

    async function submitGuess() {
        // send in answer
        await setPlayerGuessAnswer({ playerId, focusedPlayerId, answerId: selectedAnswer, gameId });
        //increment player turn index
        incrementPlayerTurnIndex({ gameData });
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
                    <button onClick={ submitGuess }>Submit your guess!</button>
                </div>
                :
                <div>They're guessing your answer right now so just CHILL</div> }
        </div>
    );
}
