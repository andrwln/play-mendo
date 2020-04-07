import keycode from 'keycode';

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
        if (!answers[player.id]) {
            pending.push(player.name);
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
};

export function getMostPopularGuess(guesses) {
    // returns most popular guess as an answer object
    const guessesMap = {};
    Object.keys(guesses).forEach(playerId => {
        const guessAnswerId = guesses[playerId];
        if (playerId === 'count') return;
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
        guessObj.answerId = answerId;
        return guessObj;
    });

    // return guess arr ordered by number of votes
    return guessDataArr.sort((a, b) => {
        return b.count - a.count;
    });
};

export function getTopGroupGuess(guessBreakdown, answerOptions) {
    const topVoteCount = guessBreakdown[0].count;
    const topAnswer = getItemByIdFromArr(answerOptions, guessBreakdown[0].answerId);
    const topAnswerList = [topAnswer.label];
    let searching = true;
    let index = 1;
    let otherTopAnswer = null
    while(searching && index < guessBreakdown.length) {
        if (guessBreakdown[index].count === topVoteCount) {
            otherTopAnswer = getItemByIdFromArr(answerOptions, guessBreakdown[index].id);
            topAnswerList.push(otherTopAnswer.label);
        } else {
            searching = false;
        }
    }
    return topAnswerList.join(', ');
}
