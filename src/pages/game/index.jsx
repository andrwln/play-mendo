import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { useCookies } from 'react-cookie';
import { Actions } from '../../store/actions';
import { getSessionData } from '../../store/sessionStorageUtils';
import { useGameSnapshot } from '../../database/snapshotHooks';
import Lobby from './Lobby';
import Prompt from './Prompt';
import Guess from './Guess';
import Results from './Results';

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
        case 2:
            return <Guess />;
        case 3:
            return <Results />;
        default:
            return <Lobby />;
    }

}

export default function GameContainer(props) {
    const { state, dispatch } = useStore();
    const [ cookies, setCookie ] = useCookies(['player']);
    const { gameData } = state;
    const players = gameData ? gameData.players : [];
    const { id } = useParams();
    useEffect(() => {
        if (!state.playerData) {
            console.log('cookies: ', cookies);
            const playerData = cookies.player;
            const isPlayerInCurrentGame = !state.gameData || players.some(player => player.id === playerData.id);
            if (playerData && isPlayerInCurrentGame) {
                // set to store
                dispatch(Actions.setPlayerData(playerData));
            } else {
                if (state.gameData) {
                    props.history.push('/');
                }
            }
        }
    },[]);
    useGameSnapshot(id.toLowerCase());
    return generateGameComponent(state);
}
