import firebase from 'firebase';

const firestore = firebase.firestore;
const { FieldValue } = firestore;

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

const db = firebase.firestore();

// methods
export const createGame = async (playerId) => {
    return db.collection('game').add({
        host: playerId,
        players: [playerId],
    })
        .then(docRef => {
            console.log('created new game with id: ', docRef.id);
            return docRef.id;
        })
        .catch(error => {
            console.error('error creating game : ', error);
        });
};

export const createPlayer = async (name) => {
    return db.collection('players').add({
        name,
    })
        .then(docRef => {
            console.log('created new player with id: ', docRef.id);
            return docRef.id;
        })
        .catch(error => {
            console.error('error creating player : ', error);
        });
};

export const getPlayerData = async (playerId) => {
    const playerRef = db.collection('players').doc(playerId);
    return playerRef.get()
        .then(doc => {
            return doc.data();
        });
};

export const addPlayerToGame = async (playerId, gameId) => {
    const gameRef = db.collection('game').doc(gameId);
    return gameRef.update({'players': FieldValue.arrayUnion(playerId)})
        .then(() => {
            console.log('successfully added player to game');
        });
    // gameRef.get()
    //     .then(doc => {
    //         console.log('adding player to game: ', doc.data());
    //         doc.
    //     });
};

export const getPlayersInGame = async (gameId) => {
    const gameRef = db.collection('game').doc(gameId);
    return gameRef.get()
        .then(doc => {
            console.log('get player: ', doc.data());
            return doc.data();
        })
        .catch(err => {
            console.error('error getting players in game');
        });
};
