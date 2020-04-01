import React, { useState } from 'react';
import { addPlayerToGame, createPlayer } from '../database';

export default function HostGame(props) {
    const [playerName, setName] = useState('');
    const [gameId, setGameId] = useState('');
    async function joinRoom() {
        const playerId = await createPlayer(playerName);
        const game = await addPlayerToGame(playerId, gameId);
        props.history.push(`/game/${gameId}`);
    }
    const buttonDisabled = playerName.length === 0 && gameId.length === 0;
    return (
        <div>
            Player name: <input onChange={ e => setName(e.target.value) } />
            Game id: <input onChange={ e => setGameId(e.target.value) } />
            <button disabled={ buttonDisabled } onClick={ joinRoom }>Start new game</button>
        </div>
    );
}