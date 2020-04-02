import React from 'react';
import { useStore } from '../../store/useStore';
import { incrementGameStep } from '../../gameController';

export default function Lobby() {
    const { state } = useStore();
    console.log('state in lobby: ', state);
    const { gameId, playerData, gameData, players } = state;

    function startGame() {
        incrementGameStep({ gameId, gameData });
    }

    const playerList = players && players.map(player => player.name);
    return (
        <div>
            <div>This is the lobby y'all of game with ID: {gameId}</div>
            {playerList && <div>These are the players: {playerList.join(', ')} </div>}
            {playerData && <div>HI THERE YOUR NAME IS <strong>{playerData.name}</strong> and you are GREAT</div>}
            {playerData && playerData.isHost && <button onClick={ startGame }>START THIS DANG GAME</button>}
        </div>
    );
}
