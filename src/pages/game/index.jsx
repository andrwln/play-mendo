import React from 'react';
import { useParams } from 'react-router-dom';
import Lobby from './Lobby';

export default function GameContainer() {
    const { id } = useParams();
    console.log('game id: ', id);
    return (
        <Lobby gameId={ id } />
    );
}
