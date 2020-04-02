import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { Actions } from '../../store/actions';
import { getSessionData } from '../../store/sessionStorageUtils';
import { useGameSnapshot } from '../../database/snapshotHooks';
import Lobby from './Lobby';
import Prompt from './Prompt';

function generateGameComponent(state) {
    const { gameData } = state;
    if (!gameData  ) {
        return null;
    }
    const { stepIndex } = gameData;

    switch(stepIndex) {
        case 0:
            return <Lobby />;
        case 1:
            return <Prompt />;
        default:
            return <Lobby />;
    }

}

export default function GameContainer(props) {
    const { state, dispatch } = useStore();
    const { id } = useParams();
    useEffect(() => {
        if (!state.playerData) {
            // check if player data exists in session storage
            const playerData = getSessionData('playMendoPlayer');
            if (playerData) {
                // set to store
                dispatch(Actions.setPlayerData(playerData));
                dispatch(Actions.setGameId(id));
            } else {
                props.history.push('/');
            }
        }
    },[]);
    useGameSnapshot(id);
    return generateGameComponent(state);
}
