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

export function getItemByIdFromArr(id, arr) {
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
