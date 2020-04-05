import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from '../store/useStore';
import { joinGameAsPlayer } from '../gameController';
import { StyledPageContainer } from './styles';
import Input from '../components/Input';
import Button from '../components/Button';

export default function HostGame(props) {
    const { dispatch } = useStore();
    const [playerName, setName] = useState('');
    const [gameId, setGameId] = useState('');
    async function joinRoom() {
        const sanitizedId = gameId.toLowerCase();
        await joinGameAsPlayer({ playerName, gameId: sanitizedId, dispatch});
        props.history.push(`/game/${gameId}`);
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
    }
    .footerSection {
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
`;