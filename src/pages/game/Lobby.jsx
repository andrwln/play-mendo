import React, { useState, useEffect } from 'react';
import { getPlayersInGame } from '../../database';

export default function Lobby(props) {
    const { gameId } = props;
    useEffect(() => {
        async function gameData() {
            const game = await getPlayersInGame(gameId);
            return game;
        }
        gameData();
    }, []);
    return (
        <div>
            <div>This is the lobby y'all of game with ID: {gameId}</div>
            <div>These are the players: </div>
        </div>
    );
}
