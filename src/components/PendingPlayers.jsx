import React from 'react';
import styled from 'styled-components';
import PlayerIcon from './PlayerIcon';

export default function PendingPlayers(props) {
    const { submittedAnswers, players, iconData } = props;
    const { characters, colors } = iconData;
    const morePlayers = [ ...players, ...players, ...players, ...players, ...players, ...players];
    return (
        <PendingPlayersContainer>
            <div className='pendingText'>We're just waiting for the these indecisive players...</div>
            <div className='playersContainer'>
                {players.map((player, playerIdx) => {
                    return (
                        <PlayerIcon
                            key={ `player-icon-${playerIdx}` }
                            isActive={ !submittedAnswers[player.id] }
                            player={ player }
                            iconData={ iconData }
                            players={ players }
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
        /* font-weight: bold; */
        font-size: 20px;
        /* margin-bottom: 36px; */
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
            }
        }
    }

`;
