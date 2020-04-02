import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import CreateTopic from '../components/CreateTopic';
import { initiateNewGame } from '../gameController';

export default function HostGame(props) {
    const { state, dispatch } = useStore();
    const [playerName, setName] = useState('');
    async function startNewGame() {
        // start new game and redirect user to game game lobby page
        const gameId = await initiateNewGame({ playerName, topicRawData: state.topicData, dispatch });
        props.history.push(`/#game/${gameId}`);
    }
    const buttonDisabled = playerName.length === 0;
    return (
        <div>
            Player name: <input onChange={ (e) => setName(e.target.value) } />
            <CreateTopic />
            <button disabled={ buttonDisabled } onClick={ startNewGame }>Start new game</button>
        </div>
    );
}
