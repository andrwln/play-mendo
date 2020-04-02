import { useEffect } from 'react';
import { db, realtimeDB, getPlayersData, getTopicData } from '.';
import { useStore } from '../store/useStore';
import { Actions } from '../store/actions';
import { snapshotListToArray } from '../utils';

export const useGameSnapshot = (gameId) => {
    const { dispatch } = useStore();
    // useEffect(() => {
    //     const unsubscribeGames = db.collection('games').doc(gameId)
    //         .onSnapshot({
    //             includeMetadataChanges: true,
    //         }, async doc => {
    //             console.log('game snapshot updated with doc: ', doc.data());
    //             if (doc.exists) {
    //                 const data = doc.data();
    //                 // if (!data.players) data.players = await getPlayersData(gameId);
    //                 data.topicData = await getTopicData(data.topicId);
    //                 dispatch(Actions.setGameData(data));
    //                 return data;
    //             }
    //         });

    //     const unsubscribePlayers = db.collection(`games/${gameId}/players`)
    //         .onSnapshot({
    //             includeMetadataChanges: true,
    //         }, async snapshots => {
    //             const players = [];
    //             snapshots.forEach(doc => {
    //                 players.push({ ...doc.data(), playerId: doc.id });
    //             });
    //             console.log('updated players: ', players);
    //             dispatch(Actions.updateGameData({ players }));
    //         });

    //     // turn off snapshot listener
    //     return () => {
    //         unsubscribeGames();
    //         unsubscribePlayers();
    //     };
    // }, []);
    useEffect(() => {
        const unsubscribeGames = realtimeDB.ref(`games/${gameId}`)
            .on('value', async snapshot => {
                console.log('game snapshot updated with doc: ', snapshot.val());
                if (snapshot.exists) {
                    const playerArr = snapshotListToArray(snapshot.child('players'));
                    const data = snapshot.val();
                    data.topicData = await getTopicData(data.topicId);
                    data.players = playerArr;
                    dispatch(Actions.setGameData(data));
                    return data;
                }
            });

        // const unsubscribePlayers = db.collection(`games/${gameId}/players`)
        //     .onSnapshot({
        //         includeMetadataChanges: true,
        //     }, async snapshots => {
        //         const players = [];
        //         snapshots.forEach(doc => {
        //             players.push({ ...doc.data(), playerId: doc.id });
        //         });
        //         console.log('updated players: ', players);
        //         dispatch(Actions.updateGameData({ players }));
        //     });

        // turn off snapshot listener
        return () => {
            unsubscribeGames();
            // unsubscribePlayers();
        };
    }, []);
};
