import { Actions } from './store/actions';
import { createGame, addPlayerToGame, createTopic, updateGameData } from './database';
import { setSessionData } from './store/sessionStorageUtils';
import { gameDefaults } from './staticData';
import { generateSixDigitId } from './utils';

// functions to manage interaction between the react view layer, the react data store, and the database

export async function initiateNewGame({ playerName, topicRawData, dispatch }) {
    const playerId = generateSixDigitId();
    const gameId = generateSixDigitId();
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
        id: generateSixDigitId(),
        name: playerName,
        isHost: false,
        isOnline: true,
    };
    await addPlayerToGame(gameId, player);
    dispatch(Actions.setPlayerData(player));
    setSessionData('playMendoPlayer', player);
}

export function incrementGameStep({gameId, gameData}) {
    // goes to the next step of the game
    const currentStep = gameData.stepIndex;

    updateGameData(gameId, { stepIndex: currentStep + 1 });
}

export function setUserPromptAnswer({ gameId, gameData }) {

}
