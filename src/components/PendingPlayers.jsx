import React from 'react';
import styled from 'styled-components';
import PlayerIcon from './PlayerIcon';

export default function PendingPlayers(props) {
    const { submittedAnswers, players, iconData } = props;
    const { characters, colors } = iconData;
    const morePlayers = [ ...players, ...players, ...players, ...players, ...players, ...players];
    return (
        <PendingPlayersContainer>
            <div className='pendingText'>Your answer is received! Now we wait for the indecisive players...</div>
            <div className='playersContainer'>
                {players.map((player, playerIdx) => {
                    const characterIcon = characters[playerIdx];
                    const characterColor = colors[playerIdx];
                    return (
                        <PlayerIcon
                            key={ `player-icon-${playerIdx}` }
                            isActive={ !submittedAnswers[player.id] }
                            playerIndex={ playerIdx }
                            playerName={ player.name }
                            icon={ characterIcon }
                            color={ characterColor }
                            showTooltip
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
        font-size: 20px;
        margin-bottom: 36px;
    }
    .playersContainer {
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        padding: 0 15%;
        .Styled-PlayerIcon {
            margin: 30px 15px 30px 15px;
            img {
                height: 75%;
                width: 75%;
            }
        }
    }

`;
