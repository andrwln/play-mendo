import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { generateResultsPageData } from '../../utils';
import { StyledPageContainer } from '../styles';
import PlayerIcon from '../../components/PlayerIcon';
import Button from '../../components/Button';

export default function Results() {
    const { state } = useStore();
    const { playerData, gameData } = state;
    const { playerTurnIndex, players, topicData, guesses, promptAnswers } = gameData;
    const { topic, answers } = topicData;
    const resultsData = generateResultsPageData(promptAnswers, answers, players, guesses);
    function handlePlayAgain() {
        window.location.assign('/');
    }
    return (
        <StyledResultsPage>
            <div className='headerSection'>
                <div className='logoContainer'><img src='/img/logo.svg' /></div>
                <div className='topicTitle'>Game Summary</div>
            </div>
            <div className='mainSection'>
                <div className='summaryMatrix'>
                    <div className='matrixHeaders'>
                        <div className='targets'>Targets</div>
                        <div className='guesses' style={ { width: `${70 * players.length}px`} }>Guessers</div>
                    </div>
                    <div className='playerIconRow'>
                        <div className='iconPlaceholder' />
                        {players.map((player, playerIdx) => {
                            return (
                                <PlayerIcon
                                    key={ `results-icon-${playerIdx}` }
                                    player={ player }
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
                                        isActive
                                    />
                                    <div className='answerContainer'>
                                        <div className='answerLabel'>
                                            <label>{answer.label}</label>
                                        </div>
                                    </div>
                                    <div className='guessesContainer'>
                                        {players.map((guessingPlayer, guessIdx) => {
                                            const isCorrect = correctPlayers.indexOf(guessingPlayer.id) > -1;
                                            const isSameCurrentPlayer = guessingPlayer.id === player.id;
                                            const resultImg = isCorrect ? '/img/greencheck.svg' : '/img/redcross.svg';
                                            const samePlayerImg = '/img/orangestar.svg';
                                            return (
                                                <div className='guessResultContainer' key={ `guess-result-${guessIdx}` }>
                                                    <img src={ isSameCurrentPlayer ? samePlayerImg : resultImg } />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className='footerSection'>
                <Button onClick={ handlePlayAgain }>Play Again!</Button>
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
            font-size: 36px;
            font-weight: bold;
            padding: 10px 50px;
        }
    }
    .mainSection {
        .subHeader {
            margin-bottom: 40px;
            font-weight: bold;
        }
        .matrixHeaders {
            display: flex;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
            .targets {
                width: 370px;
            }
        }
        .summaryMatrix {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .playerIconRow {
            display: flex;
            padding-bottom: 15px;
            .iconPlaceholder {
                width: 400px;
            }
        }
        .playerResultsRow {
            display: flex;
            height: 100px;
            .guessesContainer {
                display: flex;
            }
            .guessResultContainer {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 60px;
                width: 60px;
                margin: 0 10px 0 20px;
                img {
                    height: 50%;
                }
            }
        }
        .answerContainer {
            padding-right: 20px;
        }
        .answerLabel {
            display: flex;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            height: 60px;
            width: 300px;
            border: 1px solid #000000;
            border-radius: 4px;
            background-color: #e5e5e5;
            padding: 10px 15px;
            font-weight: bold;
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
    .playerIconContainer {
        margin: 0 10px;
        .playerName {
            margin-top: 3px;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 60px;
            white-space: nowrap;
            font-size: 12px;
        }
        .Styled-PlayerIcon {
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
    }
    .footerSection {
        margin-top: 40px;
        button {
            height: 50px;
            width: 240px;
        }
    }
`;
