import React from 'react';
import styled from 'styled-components';
import PlayerIcon from './PlayerIcon';
import { getPlayerIconData, getItemByIdFromArr } from '../utils';
import { StyledCheckbox } from './Checkbox';

export default function ResultsBreakdownItem(props) {
    const { isCorrectAnswer, focusedPlayer, guessData, players, iconData, answers } = props;
    const { character, color } = getPlayerIconData(focusedPlayer.id, players, iconData);
    const currentAnswer = getItemByIdFromArr(answers, guessData.id);
    const checkBoxImg = isCorrectAnswer ? '/img/checkmark.svg' : '/img/crossmark.svg';
    console.log('breakdown item props: ', props);
    // guessData.playerIds = [...guessData.playerIds, ...guessData.playerIds, ...guessData.playerIds, ...guessData.playerIds, ...guessData.playerIds, ...guessData.playerIds, ...guessData.playerIds];
    // const focusedPlayerId = correctAnswer && correctAnswer.
    return (
        <StyledBreakdownItem>
            {isCorrectAnswer ?
                // <PlayerIcon
                //     isActive
                //     icon={ character }
                //     color={ color }
                //     showTooltip
                //     playerName={ focusedPlayer.name }
                // /> :
                <PlayerIcon
                    isActive
                    showTooltip
                    player={ focusedPlayer }
                    iconData={ iconData }
                    players={ players }
                /> :
                <div className='iconPlaceholder' />}
            <div className='answerContainer'>
                <StyledCheckbox style={ {cursor: 'default'} }>
                    <img src={ checkBoxImg } />
                </StyledCheckbox>
                <label>{currentAnswer.label}</label>
            </div>
            <div className='guessesContainer'>
                {guessData.playerIds.map((playerId, idx) => {
                    const playerData = getItemByIdFromArr(players, playerId);
                    const { character, color } = getPlayerIconData(playerId, players, iconData);
                    return (
                        // <PlayerIcon
                        //     key={ `guess-icon-${idx}` }
                        //     // isActive
                        //     icon={ character }
                        //     color={ color }
                        //     playerName={ playerData.name }
                        //     showTooltip
                        // />
                        <PlayerIcon
                            key={ `guess-icon-${idx}` }
                            player={ playerData }
                            iconData={ iconData }
                            players={ players }
                            showTooltip
                        />
                    );
                })}
            </div>
        </StyledBreakdownItem>
    );
}

const StyledBreakdownItem = styled.div`
    display: flex;
    align-items: center;
    .Styled-PlayerIcon {
        /* margin-right: 30px; */
        height: 60px;
        width: 60px;
        border-radius: 12.5px;
        img {
            height: 75%;
            width: 75%;
        }
    }
    .iconPlaceholder {
        width: 60px;
    }
    .answerContainer {
        display: flex;
        align-items: center;
        margin: 10px 20px;
        padding: 0 20px;
        background-color: #e5e5e5;
        box-sizing: border-box;
        border: 1px solid #000000;
        border-radius: 4px;
        height: 60px;
        width: 250px;
        .Styled-Checkbox {
            margin-right: 20px;
            height: 27px;
            width: 30px;
        }
        img {
            left: 0;
            bottom: -3px;
            height: 75%;
            width: 75%;
        }
    }
    .guessesContainer {
        display: flex;
        .Styled-PlayerIcon {
            margin-right: 10px;
        }
    }
`;
