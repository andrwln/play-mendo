import firebase from 'firebase';

// const firestore = firebase.firestore;
// const { FieldValue } = firestore;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDYhE5FU02AGz6AQSWRY2LYYwk3bw_6sUo',
    authDomain: 'play-mendo.firebaseapp.com',
    databaseURL: 'https://play-mendo.firebaseio.com',
    projectId: 'play-mendo',
    storageBucket: 'play-mendo.appspot.com',
    messagingSenderId: '206631976010',
    appId: '1:206631976010:web:5e0b52a433c9b0bb267ab3',
    measurementId: 'G-ZZVD5MWQFX',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// export const db = firebase.firestore();
export const realtimeDB = firebase.database();

// methods
export const createGame = async (data) => {
    try {
        await realtimeDB.ref(`games/${data.id}`).set(data);
    } catch(err) {
        console.error('error creating game: ', err);
    }
};
export const createTopic = async (topicData) => {
    try {
        await realtimeDB.ref(`topics/${topicData.id}`).set(topicData);
        return topicData.id;
    } catch (err) {
        console.error('error creating topic: ', err);
    }
};

export const addPlayerToGame = async (gameId, playerData) => {
    try {
        const game = await realtimeDB.ref(`games/${gameId}`).once('value');
        const gameData = game.val();
        if (gameData.stepIndex === 0) {
            const playersRef = await realtimeDB.ref(`games/${gameId}/players`).push();
            await playersRef.set(playerData);
        } else {
            throw 'Game already started';
        }
    } catch (err) {
        console.error('error adding player to game: ', err);
        throw err;
    }
};

export const incrementStepIndex = async (gameId, field) => {
    const stepRef = realtimeDB.ref(`games/${gameId}/${field}`);
    await stepRef.transaction(currentIdx => {
        console.log('incrementing current index by one from : ', currentIdx);
        return currentIdx + 1;
    });
};

export const updateGameData = async (gameId, data) => {
    try {
        return await realtimeDB.ref(`games/${gameId}`).update(data);
    } catch (err) {
        console.error('error updating game data: ', err);
    }
};

export const getTopicData = async (topicId) => {
    try {
        const topic = await realtimeDB.ref(`topics/${topicId}`).once('value');
        return topic.val();
    } catch (err) {
        console.log('error getting topic data: ', err);
    }
};

export const getAllTopics = async () => {
    try {
        const topics = await realtimeDB.ref('topics').once('value');
        return topics;
    } catch (err) {
        console.log('error getting all topics data: ', err);
    }
};


export const addPlayerPromptAnswer = async ({ gameData, answer }) => {
    try {
        const gameId = gameData.id;
        const playersRef = await realtimeDB.ref(`games/${gameId}/prompt_answers`).push();
        return await playersRef.set(answer);
        // const promptAnswersRef = realtimeDB.ref(`games/${gameId}/prompt_answers`);
        // const promptAnswersSnapshot = await promptAnswersRef.once('value');
        // const answersCount = Object.keys(promptAnswersSnapshot.val()).length;
        // if (answersCount === gameData.players.length) {
        //     return await updateGameData(gameId, { stepIndex: gameData.stepIndex + 1 });
        // }
        // return answersPromise;

    } catch(err) {
        console.error('error adding prompt answer: ', err);
    }
};

export const addPlayerGuessAnswer = async ({ gameData, focusedPlayerId, answer }) => {
    try {
        const gameId = gameData.id;
        const newGuessRef = await realtimeDB.ref(`games/${gameId}/guesses/${focusedPlayerId}`).push();
        return await newGuessRef.set(answer);
        // const guessesListRef = realtimeDB.ref(`games/${gameId}/guesses/${focusedPlayerId}`);
        // const guessListSnapshot = await guessesListRef.once('value');
        // const guessCount = Object.keys(guessListSnapshot.val()).length;
        // if (guessCount + 1 === gameData.players.length) {
        //     return await updateGameData(gameId, { playerTurnIndex: gameData.playerTurnIndex + 1 });
        // }
    } catch (err) {
        console.error('error adding player guess: ', err);
    }
};

// export const getPlayersData = async (gameId) => {
//     try {
//         const snapshot = await db.collection(`games/${gameId}/players`).get();
//         return snapshot.docs.map(doc => doc.data());
//     } catch(err) {
//         console.error('error getting players data: ', err);
//     }
// };
// export const createGame = async (data) => {
//     try {
//         const docRef =  await db.collection('games')
//             .doc(data.id).set(data);
//         console.log('created new game with id: ', docRef.id);
//         return docRef.id;
//     } catch(err) {
//         console.error('error creating game : ', err);

//     }
// };

// export const createTopic = async (topicData) => {
//     try {
//         const docRef = await db.collection('topics')
//             .add(topicData);
//         return docRef.id;
//     } catch(err) {
//         console.error('error creating topic: ', err);
//     }
// };

// export const getGameData = async (gameId) => {
//     try {
//         const gameRef = db.collection('games').doc(gameId);
//         const game = await gameRef.get()
//             .then(doc => {
//                 return doc.data();
//             });
//         game.players = await getPlayersData(game.players);
//         game.topic = await getTopicData(game.topicId);
//         return game;
//     } catch(err) {
//         console.error('error getting game data: ', err);
//     }


// };

// export const getTopicData = async (topicId) => {
//     try {
//         const doc = await db.collection('topics').doc(topicId).get();
//         return doc.data();
//     } catch(err) {
//         console.log('error getting topic data: ', err);
//     }
// };


// export const addPlayerToGame = async (gameId, playerData) => {
//     try {
//         await db.collection('games').doc(gameId)
//             .collection('players').doc(playerData.id).set({
//                 ...playerData,
//             });
//     } catch(err) {
//         console.error('error adding player to game: ', err);

//     }
// };

// export const updateGameData = async (gameId, data) => {
//     try{
//         await db.collection('games').doc(gameId).update(data);
//     } catch(err) {
//         console.error('error updating game data: ', err);
//     }
// };
