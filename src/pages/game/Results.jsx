import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { incrementPlayerTurnIndex, incrementGameStep, setPlayerGuessAnswer } from '../../gameController';
import { generateResultsPageData, getRemainingGuessers, getGuessesByPopularity, getItemByIdFromArr, getResultsMessage, getTopGroupGuess } from '../../utils';
import { StyledPageContainer } from '../styles';
import AnswerOptions from '../../components/AnswerOptions';
import PlayerIcon from '../../components/PlayerIcon';
import { StyledCheckbox } from '../../components/Checkbox';

export default function Results() {
    const { state } = useStore();
    const { playerData, gameData } = state;
    const { playerTurnIndex, players, topicData, guesses, promptAnswers, iconData } = gameData;
    const { topic, answers } = topicData;
    const playerList = players && players.map(player => player.name);
    const focusedPlayer = players[playerTurnIndex];
    const playerId = playerData.id;
    const focusedPlayerId = focusedPlayer.id;
    const resultsData = generateResultsPageData(promptAnswers, answers, players, guesses);
    console.log('results Data: ', resultsData);
    console.log('players: ', players);
    return (
        <StyledResultsPage>
            <div className='headerSection'>
                <div className='logoContainer'><img src='/img/logo.svg' /></div>
                <div className='topicTitle'>{topic}</div>
            </div>
            <div className='mainSection'>
                <div className='subHeader'>Game Summary</div>
                <div className='summaryMatrix'>
                    <div className='playerIconRow'>
                        <div className='iconPlaceholder' />
                        {players.map((player, playerIdx) => {
                            return (
                                <PlayerIcon
                                    key={ `results-icon-${playerIdx}` }
                                    player={ player }
                                    iconData={ iconData }
                                    players={ players }
                                    isActive
                                />
                            );
                        })}
                    </div>
                    <div className='playerResultRows'>
                        {resultsData.map((playerResult, resultIdx) => {
                            const { player, correctPlayers, answer } = playerResult;

                            return (
                                <div key={ `player-results-row-${resultIdx}` } className='playerResultsRow'>
                                    <PlayerIcon
                                        player={ player }
                                        iconData={ iconData }
                                        players={ players }
                                        isActive
                                        showTooltip
                                    />
                                    <div className='answerLabel'>
                                        {/* <StyledCheckbox style={ { cursor: 'default' } }>
                                            <img src="/img/greencheck.svg" />
                                        </StyledCheckbox> */}
                                        <label>{answer.label}</label>
                                    </div>
                                    {players.map((guessingPlayer, guessIdx) => {
                                        const isCorrect = correctPlayers.indexOf(guessingPlayer.id) > -1;
                                        const isSameCurrentPlayer = guessingPlayer.id === player.id;
                                        return (
                                            <div className='guessResultContainer' key={ `guess-result-${guessIdx}` }>
                                                {!isSameCurrentPlayer ? <img src={ isCorrect ? '/img/greencheck.svg' : '/img/redcross.svg' } /> : 'N/A'}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </StyledResultsPage>
    );
}

const StyledResultsPage = styled(StyledPageContainer)`
    .headerSection {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 25px;
        .logoContainer {
            width: 30%;
            img {
                max-width: 225px;
            }
        }
        .topicTitle {
            font-size: 32px;
            font-weight: bold;
            padding: 10px 50px;
        }
    }
    .mainSection {
        .subHeader {
            margin-bottom: 30px;
            font-weight: bold;
        }
        .summaryMatrix {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .playerIconRow {
            display: flex;
            .iconPlaceholder {
                width: 300px;
            }
        }
        .playerResultsRow {
            display: flex;
            align-items: center;
            height: 100px;
            .guessResultContainer {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 60px;
                width: 60px;
                margin-right: 10px;
                img {
                    height: 50%;
                }
            }
        }
        .answerLabel {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            height: 60px;
            width: 200px;
            border: 1px solid #000000;
            border-radius: 4px;
            background-color: #e5e5e5;
            padding: 10px 15px;
            font-weight: bold;
            margin-right: 30px;
            .Styled-Checkbox {
                margin-right: 20px;
                height: 27px;
                width: 30px;
                img {
                    height: 75%;
                    bottom: -3px;
                }
            }
        }
    }
    .Styled-PlayerIcon {
        margin-right: 10px;
        height: 60px;
        width: 60px;
        border-radius: 12.5px;
        .StyledTooltipContainer {
            padding: 4px 8px;
            bottom: -28px;
            .StyledTooltipArrow {
                top: -5px;
                left: 75%;
                border-width: 0 5px 8px;
            }
        }
        img {
            height: 75%;
            width: 75%;
        }
    }
`;
