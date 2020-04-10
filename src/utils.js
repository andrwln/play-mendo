import keycode from 'keycode';
import { characterList, colorList } from './staticData';

const possibleDigits = 'abcdefghijklmnopqrstuvwxyz123456789';
export function generateUniqueId(length = 6) {
    let code = '';
    while (code.length < length) {
        code += possibleDigits[Math.floor(Math.random() * possibleDigits.length)];
    }
    console.log('generated code: ', code);
    return code;
}

export function generateGameCode() {
    return generateUniqueId(6);
}

export function generateDataId() {
    return generateUniqueId(10);
}

export function snapshotListToArray(snapshot) {
    const returnArr = [];

    snapshot.forEach(function (childSnapshot) {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
}

export function snapshotListToMap(snapshot) {
    let map = {};
    let count = 0;
    snapshot.forEach(childSnapshot => {
        map = {
            ...map,
            ...childSnapshot.val(),
        };
        count++;
    });
    map.count = count;
    return map;
}

export function getItemByIdFromArr(arr, id) {
    return arr.find(el => el.id === id);
}

export function getPendingPlayers(answers, players) {
    // given list of answers and players returns list of players who still need to answer
    const pending = [];

    players.forEach(player => {
        if (Object.keys(answers).indexOf(player.id) === -1) {
        // if (!answers[player.id]) {
            pending.push(player);
        }
    });
    return pending;
}

export function getRemainingGuessers(guesses, players, focusedPlayerId) {
    const guessingPlayers = players.filter(player => player.id !== focusedPlayerId);

    return getPendingPlayers(guesses[focusedPlayerId], guessingPlayers);
}

export function generateTopicSelectOptions(topics) {
    return topics.map(topic => {
        return {
            value: topic.id,
            label: topic.topic,
        };
    });
}

export function keySpaceEnter(event, callback) {
    switch (keycode(event)) {
        case 'enter':
        case 'space':
            event.preventDefault();
            callback(event);
            break;
    }
}

export function getGuessesByPopularity(guesses) {
    const guessesMap = {};
    Object.keys(guesses).forEach(playerId => {
        const guessAnswerId = guesses[playerId];
        if (playerId === 'count' || guesses[playerId] === '') return;
        if (guessesMap[guessAnswerId]) {
            guessesMap[guessAnswerId].push(playerId);
        } else {
            guessesMap[guessAnswerId] = [playerId];
        }
    });

    const guessDataArr = Object.keys(guessesMap).map(answerId => {
        const playerList = guessesMap[answerId];
        const guessObj = {};
        guessObj.count = playerList.length;
        guessObj.playerIds = playerList;
        guessObj.id = answerId;
        return guessObj;
    });

    // return guess arr ordered by number of votes
    return guessDataArr.sort((a, b) => {
        return b.count - a.count;
    });
}

export function getTopGroupGuess(guessBreakdown, answerOptions) {
    const topVoteCount = guessBreakdown[0].count;
    const topAnswer = getItemByIdFromArr(answerOptions, guessBreakdown[0].id);
    const topAnswerList = [topAnswer];
    let searching = true;
    let index = 1;
    let otherTopAnswer = null;
    while(searching && index < guessBreakdown.length) {
        if (guessBreakdown[index].count === topVoteCount) {
            otherTopAnswer = getItemByIdFromArr(answerOptions, guessBreakdown[index].id);
            topAnswerList.push(otherTopAnswer);
            index++;
        } else {
            searching = false;
        }
    }
    return topAnswerList;
}

export function getResultsMessage(focusedPlayerInGuesses, topGroupAnswer, focusedPlayer) {
    const numberOfTopAnswers = topGroupAnswer.length;
    const hasMultipleTopGuesses = numberOfTopAnswers > 1;
    let message = '';
    if (focusedPlayerInGuesses) {
        message = hasMultipleTopGuesses ?
            `I guess only some of you guys kinda know ${focusedPlayer.name} ...?` :
            `${focusedPlayer.name} has some great friends or is just plain easy to read. Either way, nailed it!`;
    } else {
        message = `Wow, well that's disappointing... Y'all don't seem to know ${focusedPlayer.name} at all!`;
    }
    return message;
}

function shuffleArray(array) {
    // returns copy of shuffled array
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

export function getRandomizedCharacterData() {
    return {
        characters: shuffleArray(characterList),
        colors: shuffleArray(colorList),
    };
}

export function getPlayerIconData(playerId, players, iconData) {
    const playerIndex = players.findIndex(player => player.id === playerId);
    const { characters, colors } = iconData;
    // let character; let color;

    function getOption(startingIdx, options) {
        // if(startingIdx === 7) debugger;
        // if (startingIdx < options.length) {
        //     return options[startingIdx];
        // } else {
        //     debugger;
        //     const adjustedIdx = startingIdx - options.length;
        //     getOption(adjustedIdx, options);
        // }
        let adjustedIndex = startingIdx;
        while (adjustedIndex > options.length - 1) {
            adjustedIndex = adjustedIndex - options.length;
        }
        return options[adjustedIndex];
    }

    const character = getOption(playerIndex, characters);
    const color = getOption(playerIndex, colors);
    // if (playerIndex < characters.length) {
    //     character = characters[playerIndex];
    // } else {
    //     const adjustedIdx = playerIndex - characters.length;
    //     character = characters[adjustedIdx];
    // }

    // if (playerIndex < colors.length) {
    //     color = colors[playerIndex];
    // } else {
    //     const adjustedIdx = playerIndex - colors.length;
    //     color = colors[adjustedIdx];
    // }
    return {
        character,
        color,
    };
}

export function generateResultsPageData(promptAnswers, answerOptions, players, guesses) {
    const sanitizedPromptAnswers = { ...promptAnswers };
    delete sanitizedPromptAnswers.count;
    const resultsData = Object.keys(sanitizedPromptAnswers).map((playerId, answerIdx) => {
        // answer that the player selected for himself
        const answerId = promptAnswers[playerId];
        // object of player guesses for this particular player where the key is the player id and the val is the answer id
        const playerGuesses = guesses[playerId];
        // list of player Ids that guessed player's answer correctly
        const correctPlayers = [];
        const player = getItemByIdFromArr(players, playerId);
        const answer = getItemByIdFromArr(answerOptions, answerId);
        Object.keys(playerGuesses).forEach(pId => {
            if (playerGuesses[pId] === answerId) {
                correctPlayers.push(pId);
            }
        });

        return {
            player,
            answer,
            correctPlayers,
        };
    });
    return resultsData;
}
