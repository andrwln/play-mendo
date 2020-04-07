import React from 'react';
import styled from 'styled-components';
import PlayerIcon from './PlayerIcon';

export default function PendingPlayers(props) {
    const { submittedAnswers, players } = props;
    return (
        <PendingPlayersContainer>
            <div className='pendingText'>Your answer is received. Now we wait for the indecisive players...</div>
            <div className='playersContainer'>
                {players.map((player, playerIdx) => {
                    return (
                        <PlayerIcon
                            key={ `player-icon-${playerIdx}` }
                            isActive={ !!submittedAnswers[player.id] }
                            playerIndex={ playerIdx }
                            playerName={ player.name }
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
    .pendingText {
        font-weight: bold;
        font-size: 32px;
        margin-bottom: 36px;
    }
    .playersContainer {
        display: flex;
        flex-flow: wrap;
        justify-content: flex-start;
        padding: 0 50px;
        .Styled-PlayerIcon {
            margin: 15px;
        }
    }

`;
