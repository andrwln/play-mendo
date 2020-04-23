import React from 'react';
import styled from 'styled-components';
import PlayerIcon from './PlayerIcon';
import { shuffleArray } from '../utils';
import { waitingMessages } from '../staticData';

export default function PendingPlayers(props) {
    const { submittedAnswers, players } = props;
    const waitingMessage = shuffleArray(waitingMessages)[0];

    // const morePlayers = [ ...players, ...players, ...players, ...players, ...players, ...players];
    return (
        <PendingPlayersContainer>
            <div className='pendingText'>{waitingMessage}</div>
            <div className='playersContainer'>
                {players.map((player, playerIdx) => {
                    return (
                        <PlayerIcon
                            key={ `player-icon-${playerIdx}` }
                            isActive={ !submittedAnswers[player.id] }
                            player={ player }
                            showTooltip={ submittedAnswers[player.id] }
                        />
                    );
                })}
            </div>
        </PendingPlayersContainer>
    );
}

const PendingPlayersContainer = styled.div.attrs(() => ({
    className: 'Styled-PendingPlayers',
}))`
    width: 100%;
    .pendingText {
        font-size: 20px;
    }
    .playersContainer {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        padding: 0 15%;
        .playerIconContainer {
            margin: 30px 15px 30px 15px;
            img {
                height: 75%;
                width: 75%;
            }
            .playerName {
                margin-top: 8px;
                width: 80px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }

`;
