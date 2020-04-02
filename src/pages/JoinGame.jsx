import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { joinGameAsPlayer } from '../gameController';

export default function HostGame(props) {
    const { dispatch } = useStore();
    const [playerName, setName] = useState('');
    const [gameId, setGameId] = useState('');
    async function joinRoom() {
        await joinGameAsPlayer({ playerName, gameId, dispatch});
        props.history.push(`/game/${gameId}`);
    }
    const buttonDisabled = playerName.length === 0 && gameId.length === 0;
    return (
        <div>
            Player name: <input onChange={ e => setName(e.target.value) } />
            Game id: <input onChange={ e => setGameId(e.target.value) } />
            <button disabled={ buttonDisabled } onClick={ joinRoom }>Join game</button>
        </div>
    );
}
