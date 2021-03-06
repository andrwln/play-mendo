import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { incrementGameStep } from '../../gameController';
import { StyledPageContainer } from '../styles';
import Button from '../../components/Button';
import PlayerIcon from '../../components/PlayerIcon';
import CreatedByFooter from '../../components/CreatedByFooter';

export default function Lobby() {
    const { state } = useStore();
    const { id: gameId } = useParams();
    const { playerData, gameData } = state;
    const { players, iconData } = gameData;
    // const gameId = gameData.id;
    // const morePlayers = [ ...players, ...players, ...players, ...players, ...players];

    function startGame() {
        incrementGameStep({ gameId, gameData });
    }
    // const extraPlayers = [...players, ...players, ...players, ...players, ...players, ...players]
    return (
        <LobbyPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
            </div>
            <div className='mainSection'>
                <div className='playersContainer'>
                    {players.map((player, playerIdx) => {
                        return (
                            <div key={ `player-icon-${playerIdx}` }>
                                <PlayerIcon
                                    player={ player }
                                    isActive
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='footerSection'>
                <div className='roomCodeDisplay'>
                    Your Room Code is: <strong>{gameId.toUpperCase()}</strong>
                </div>
                {playerData.isHost ?
                    <div className='btnContainer'>
                        <Button disabled={ players.length === 1 } className='startGame' onClick={ startGame }>Start the dang game!</Button>
                    </div> :
                    <div>
                        <div className='nonHostText'>Waiting for all players to join...</div>
                        <Loader
                            type='ThreeDots'
                            color='#ecbf4b'
                            height={ 80 }
                            width={ 80 }
                        />
                    </div>}
                <CreatedByFooter />
            </div>
        </LobbyPageContainer>
    );
}

const LobbyPageContainer = styled(StyledPageContainer)`
    .headerSection {
        height: 24%;
    }
    .mainSection {
        .playersContainer {
            display: flex;
            flex-flow: wrap;
            justify-content: center;
            padding: 0 10%;
            .Styled-PlayerIcon {
                margin: 15px;
                width: 120px;
                height: 120px;
            }
            .playerName {
                width: 130px;
                padding: 0 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
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
            font-size: 12px;
        }
        .nonHostText {
            font-size: 18px;
            color: #000000;
        }
    }
`;
