import { Actions } from './store/actions';
import { createGame, addPlayerToGame, incrementStepIndex, addPlayerPromptAnswer, addPlayerGuessAnswer } from './database';
import { setSessionData } from './store/sessionStorageUtils';
import { gameDefaults } from './staticData';
import { generateDataId, generateGameCode, getRandomizedCharacterData } from './utils';

// functions to manage interaction between the react view layer, the react data store, and the database

export async function initiateNewGame({ playerName, topicId, dispatch }) {
    const playerId = generateDataId();
    const gameId = generateGameCode();
    // creates game as host
    const player = {
        name: playerName,
        id: playerId,
        isHost: true,
        isOnline: true,
    };
    const iconData = getRandomizedCharacterData();
    // const topicId = await createTopic(topicRawData);
    const gameData = {
        ...gameDefaults,
        id: gameId,
        topicId,
        players: [],
        iconData,
        prompt_answers: [],
        guesses: [],
        playerTurnIndex: 0,
    };
    await createGame(gameData);
    await addPlayerToGame(gameId, player);

    dispatch(Actions.setGameData(gameData));
    dispatch(Actions.setPlayerData(player));
    // setSessionData('playMendoPlayer', player);
    return {
        gameId,
        player,
    };
}

export async function joinGameAsPlayer({ playerName, gameId, dispatch }) {
    const player = {
        id: generateDataId(),
        name: playerName,
        isHost: false,
        isOnline: true,
    };
    try {
        await addPlayerToGame(gameId, player);
        dispatch(Actions.setPlayerData(player));
        return player;
    } catch(e) {
        console.log('catching err add player');
        return false;
    }
    // setSessionData('playMendoPlayer', player);
}

export async function incrementGameStep({gameData}) {
    // goes to the next step of the game
    const gameId = gameData.id;

    return await incrementStepIndex(gameId, 'stepIndex');
}

export async function incrementPlayerTurnIndex({gameData}) {
    const gameId = gameData.id;

    return await incrementStepIndex(gameId, 'playerTurnIndex');
}

export async function setPlayerPromptAnswer({ playerId, answerId, gameData }) {
    const answer = {
        [playerId]: answerId,
    };

    return await addPlayerPromptAnswer({ gameData, answer });
}

export async function setPlayerGuessAnswer({ playerId, focusedPlayerId, answerId, gameData }) {
    const answer = {
        [playerId]: answerId,
    };

    return await addPlayerGuessAnswer({ gameData, focusedPlayerId, answer });
}
