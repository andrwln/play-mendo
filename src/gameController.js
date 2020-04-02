import { Actions } from './store/actions';
import { createGame, addPlayerToGame, createTopic, updateGameData, addPlayerPromptAnswer, addPlayerGuessAnswer } from './database';
import { setSessionData } from './store/sessionStorageUtils';
import { gameDefaults } from './staticData';
import { generateDataId, generateGameCode } from './utils';

// functions to manage interaction between the react view layer, the react data store, and the database

export async function initiateNewGame({ playerName, topicRawData, dispatch }) {
    const playerId = generateDataId();
    const gameId = generateGameCode();
    // creates game as host
    const player = {
        name: playerName,
        id: playerId,
        isHost: true,
        isOnline: true,
    };
    const topicId = await createTopic(topicRawData);
    const gameData = {
        ...gameDefaults,
        id: gameId,
        topicId,
        players: [],
        prompt_answers: [],
        guesses: [],
        playerTurnIndex: 0,
    };
    await createGame(gameData);
    await addPlayerToGame(gameId, player);

    dispatch(Actions.setGameData(gameData));
    dispatch(Actions.setPlayerData(player));
    setSessionData('playMendoPlayer', player);
    return gameId;
}

export async function joinGameAsPlayer({ playerName, gameId, dispatch }) {
    const player = {
        id: generateDataId(),
        name: playerName,
        isHost: false,
        isOnline: true,
    };
    await addPlayerToGame(gameId, player);
    dispatch(Actions.setPlayerData(player));
    setSessionData('playMendoPlayer', player);
}

export function incrementGameStep({gameData}) {
    // goes to the next step of the game
    const gameId = gameData.id;
    const currentStep = gameData.stepIndex;

    updateGameData(gameId, { stepIndex: currentStep + 1 });
}

export function incrementPlayerTurnIndex({gameData}) {
    const gameId = gameData.id;
    const currentPlayerTurnIndex = gameData.playerTurnIndex;

    updateGameData(gameId, { playerTurnIndex: currentPlayerTurnIndex + 1 });
}

export async function setPlayerPromptAnswer({ playerId, answerId, gameId }) {
    const answer = {
        [playerId]: answerId,
    };

    return await addPlayerPromptAnswer({ gameId, answer });
}

export async function setPlayerGuessAnswer({ playerId, focusedPlayerId, answerId, gameId }) {
    const answer = {
        [playerId]: answerId,
    };

    return await addPlayerGuessAnswer({ gameId, focusedPlayerId, answer });
}
