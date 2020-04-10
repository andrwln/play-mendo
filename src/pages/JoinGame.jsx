import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from '../store/useStore';
import Cookies from 'js-cookie';
import { joinGameAsPlayer } from '../gameController';
import { StyledPageContainer } from './styles';
import Input from '../components/Input';
import Button from '../components/Button';

export default function HostGame(props) {
    const { dispatch } = useStore();
    const [playerName, setName] = useState('');
    const [gameId, setGameId] = useState('');
    const [joinErr, setJoinErr] = useState(false);
    async function joinRoom() {
        const sanitizedId = gameId.toLowerCase();

        const player = await joinGameAsPlayer({ playerName, gameId: sanitizedId, dispatch});

        if (player) {
            Cookies.set('player', player);
            props.history.push(`/game/${gameId}`);
        } else {
            //show error state
            setJoinErr(true);
        }
    }
    function handleGameIdChanged(val) {
        const sanitizedVal = val.substring(0, 6).toUpperCase();
        setGameId(sanitizedVal);
    }
    const buttonDisabled = playerName.length === 0 && gameId.length === 0;
    return (
        <JoinPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
            </div>
            <div className='mainSection'>
                <Input placeholderText='Enter 6-digit Room Code' value={ gameId } handleInputChanged={ handleGameIdChanged } />
                <Input placeholderText='Set Your Player name' handleInputChanged={ setName } />
                <div className='btnContainer'>
                    <Button disabled={ buttonDisabled } onClick={ joinRoom }>Join Room</Button>
                </div>
                {joinErr && <div className='errorMsg'>Game does not exist or has already started.</div>}
            </div>
            <div className='footerSection'>created by JDAK</div>
        </JoinPageContainer>
    );
}

const JoinPageContainer = styled(StyledPageContainer)`
    .mainSection {
        display: flex;
        flex-direction: column;
        align-items: center;
        .btnContainer {
            width: 360px;
            height: 64px;
        }
        .errorMsg {
            margin-top: 10px;
            color: red;
        }
    }
    .footerSection {
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
`;