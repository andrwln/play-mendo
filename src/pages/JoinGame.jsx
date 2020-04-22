import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from '../store/useStore';
import Cookies from 'js-cookie';
import { joinGameAsPlayer } from '../gameController';
import { StyledPageContainer } from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import HelperText from '../components/HelperText';

export default function HostGame(props) {
    const { dispatch } = useStore();
    const [playerName, setName] = useState('');
    const [gameId, setGameId] = useState('');
    const [joinErr, setJoinErr] = useState(false);
    const [hasJoined, setHasJoined] = useState(false);
    async function joinRoom() {
        const sanitizedId = gameId.toLowerCase();
        setHasJoined(true);
        const player = await joinGameAsPlayer({ playerName, gameId: sanitizedId, dispatch});

        if (player) {
            Cookies.set('player', player);
            props.history.push(`/game/${gameId}`);
        } else {
            //show error state
            setHasJoined(false);
            setJoinErr(true);
        }
    }
    function handlePlayerNameChanged(val) {
        const validatedName = val.substring(0, 16).replace(/ /g, '');

        setName(validatedName);
    }
    function handleGameIdChanged(val) {
        const sanitizedVal = val.substring(0, 6).toUpperCase();
        setGameId(sanitizedVal);
    }
    const buttonDisabled = (playerName.length === 0 && gameId.length === 0) || hasJoined;
    return (
        <JoinPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
            </div>
            <div className='mainSection'>
                <div className='helperTextContainer'>
                    <HelperText>ASK YOUR GAME HOST TO GIVE THIS TO YOU</HelperText>
                </div>
                <Input placeholderText='Enter 6-digit Room Code' value={ gameId } handleInputChanged={ handleGameIdChanged } />
                <Input placeholderText='Set Your Player name' value={ playerName } handleInputChanged={ handlePlayerNameChanged } />
                <div className='btnContainer'>
                    <Button
                        disabled={ buttonDisabled }
                        onClick={ joinRoom }
                    >
                        Join Room
                    </Button>
                </div>
                {joinErr && <div className='errorMsg'>Game does not exist or has already started.</div>}
            </div>
            <div className='footerSection'>created by JDDAK &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;Illustrations by Justin Graham</div>
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
        .helperTextContainer {
            flex-shrink: 1;
            position: relative;
            .helperText {
                width: 200px;
                left: 235px;
                bottom: -50px;
                ::before {
                    left: -50px;
                    top: 30px;
                }
            }
        }
    }
    .footerSection {
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
`;