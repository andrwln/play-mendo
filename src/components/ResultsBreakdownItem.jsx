import React from 'react';
import styled from 'styled-components';
import PlayerIcon from './PlayerIcon';
import { getItemByIdFromArr } from '../utils';
import { StyledCheckbox } from './Checkbox';

export default function ResultsBreakdownItem(props) {
    const { isCorrectAnswer, focusedPlayer, guessData, players, answers } = props;
    const currentAnswer = getItemByIdFromArr(answers, guessData.id);
    const checkBoxImg = isCorrectAnswer ? '/img/checkmark.svg' : '/img/crossmark.svg';
    return (
        <StyledBreakdownItem>
            {isCorrectAnswer ?
                <PlayerIcon
                    isActive
                    player={ focusedPlayer }
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
                    return (
                        <PlayerIcon
                            key={ `guess-icon-${idx}` }
                            player={ playerData }
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
    height: 80px;
    padding-bottom: 8px;
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
    .playerName {
        margin-top: 3px;
        width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
    }
    .iconPlaceholder {
        width: 60px;
    }
    .answerContainer {
        display: flex;
        align-items: center;
        margin: 0 20px;
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
            min-width: 30px;
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
