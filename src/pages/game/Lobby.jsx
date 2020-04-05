import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { incrementGameStep } from '../../gameController';
import { StyledPageContainer } from '../styles';
import Button from '../../components/Button';

export default function Lobby() {
    const { state } = useStore();
    console.log('state in lobby: ', state);
    const { playerData, gameData } = state;
    const gameId = gameData.id;
    const players = gameData.players;

    function startGame() {
        incrementGameStep({ gameId, gameData });
    }

    const playerList = players && players.map(player => player.name);
    return (
        <LobbyPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
            </div>
            <div className='mainSection'>
                {playerList && <div>These are the players that have joined: {playerList.join(', ')} </div>}
            </div>
            <div className='footerSection'>
                <div className='roomCodeDisplay'>
                    Your Room Code is: <strong>{gameId.toUpperCase()}</strong>
                </div>
                <div className='shareText'>Copy and share this Room Code to your friends!</div>
                {playerData.isHost ?
                    <div className='btnContainer'>
                        <Button className='startGame' onClick={ startGame }>Everybody's in! Let's Start!</Button>
                    </div> :
                    <div className='nonHostText'>Waiting for all players to join -- show some loading animation here...</div>}
                <div className='createdBy'>created by JDAK</div>
            </div>
        </LobbyPageContainer>
        // <div>
        //     <div>This is the lobby y'all of game with ID: {gameId.toUpperCase()}</div>
        //     {playerData && <div>HI THERE YOUR NAME IS <strong>{playerData.name}</strong> and you are GREAT</div>}
        //     {playerData && playerData.isHost && <button onClick={ startGame }>START THIS DANG GAME</button>}
        // </div>
    );
}

const LobbyPageContainer = styled(StyledPageContainer)`
    .headerSection {
        height: 24%;
    }
    .footerSection {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: rgba(0, 0, 0, 0.5);
        font-size: 20px;
        .roomCodeDisplay {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            strong {
                color: #EF7116;
                font-size: 40px;
                margin-left: 15px;
            }
        }
        .shareText {
            margin-bottom: 20px;
        }
        .btnContainer {
            display: inline-block;
            width: 360px;
            height: 64px;
        }
        .createdBy {
            margin-top: 10px;
            color: #000000;
            font-size: 12px;
        }
        .nonHostText {
            font-size: 32px;
            font-weight: bold;
            color: #000000;
        }
    }
`;
