import React from 'react';
import styled from 'styled-components';
import { useStore } from '../../store/useStore';
import { generateResultsPageData } from '../../utils';
import { StyledPageContainer } from '../styles';
import PlayerIcon from '../../components/PlayerIcon';
import Button from '../../components/Button';

export default function Results() {
    const { state } = useStore();
    const { gameData } = state;
    const { players, topicData, guesses, promptAnswers } = gameData;
    const { answers } = topicData;
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
                        <div className='player'>Player</div>
                        <div className='answer'>Final Answer</div>
                        <div className='score'>Score</div>
                        {players.map((player, playerIdx) => {
                            return (
                                <div
                                    key={ `player-name-${playerIdx}` }
                                    className='player'
                                >
                                    <span>{player.name}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div className='playerResultRows'>
                        {resultsData.map((playerResult, resultIdx) => {
                            const { player, correctPlayers, answer } = playerResult;
                            const score = correctPlayers.length;

                            return (
                                <div key={ `player-results-row-${resultIdx}` } className='playerResultsRow'>
                                    <PlayerIcon
                                        player={ player }
                                        isActive
                                    />
                                    <div className='answer'>
                                        <label>{answer.label}</label>
                                    </div>
                                    <div className='score'>{score}</div>
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
        .player {
            width: 80px;
        }
        .answer {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 0 30px;
            width: 200px;
        }
        .score {
            width: 60px;
            margin-right: 20px;
        }
        .subHeader {
            margin-bottom: 40px;
            font-weight: bold;
        }
        .matrixHeaders {
            display: flex;
            font-size: 14px;
            .player {
                width: 70px;
                margin: 0 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
                width: 410px;
            }
        }
        .playerResultsRow {
            display: flex;
            align-items: center;
            height: 100px;
            padding: 15px 0;
            .answer {
                font-size: 20px;
                font-weight: bold;
            }
            .score {
                font-size: 20px;
                font-weight: bold;
            }
            .guessesContainer {
                display: flex;
            }
            .guessResultContainer {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 60px;
                width: 60px;
                margin: 0 10px;
                img {
                    height: 50%;
                }
            }
        }
        .answerContainer {
            padding-right: 30px;
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
