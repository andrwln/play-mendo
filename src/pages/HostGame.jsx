import React, { useState } from 'react';
import { createGame, createPlayer } from '../database';

export default function HostGame(props) {
    const [playerName, setName] = useState('');
    async function startNewGame(player) {
        const playerId = await createPlayer(player);
        const gameId = await createGame(playerId);
        props.history.push(`/game/${gameId}`);
    }
    const buttonDisabled = playerName.length === 0;
    return (
        <div>
            Player name: <input onChange={ (e) => setName(e.target.value) } />
            <button disabled={ buttonDisabled } onClick={ () => startNewGame(playerName) }>Start new game</button>
        </div>
    );
}
