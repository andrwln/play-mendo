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
        const playersRef = await realtimeDB.ref(`games/${gameId}/players`).push();
        await playersRef.set(playerData);
    } catch (err) {
        console.error('error adding player to game: ', err);

    }
};

export const updateGameData = async (gameId, data) => {
    try {
        await realtimeDB.ref(`games/${gameId}`).update(data);
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


export const addPlayerPromptAnswer = async ({ gameId, answer }) => {
    try {
        const playersRef = await realtimeDB.ref(`games/${gameId}/prompt_answers`).push();
        await playersRef.set(answer);
    } catch(err) {
        console.error('error adding prompt answer: ', err);
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
