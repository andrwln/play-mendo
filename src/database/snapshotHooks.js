import { useEffect } from 'react';
import { db, realtimeDB, getPlayersData, getTopicData } from '.';
import { useStore } from '../store/useStore';
import { Actions } from '../store/actions';
import { snapshotListToArray, snapshotListToMap, getPendingPlayers } from '../utils';
import { incrementGameStep, incrementPlayerTurnIndex } from '../gameController';

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
                if (snapshot.exists) {
                    const data = snapshot.val();
                    data.players = snapshotListToArray(snapshot.child('players'));
                    data.topicData = await getTopicData(data.topicId);

                    switch(data.stepIndex) {
                        case 0:
                            break;
                        case 1:
                            data.promptAnswers = snapshotListToMap(snapshot.child('prompt_answers'));
                            data.pendingPlayers = getPendingPlayers(data.promptAnswers, data.players);
                            if (data.pendingPlayers.length === 0) {
                                // we should increment the step now
                                await incrementGameStep({ gameData: data });
                            }
                            break;
                        case 2:
                            data.guesses = {};
                            data.activePlayer = data.players[data.playerTurnIndex];
                            // there is a list of guesses for each player
                            // create a map of guesses by player ID, with each player having a list of
                            // guesses from other players
                            snapshot.child('guesses').forEach(playerIdSnapshot => {
                                data.guesses[playerIdSnapshot.key] = snapshotListToMap(playerIdSnapshot);
                            });
                            if (data.guesses[data.activePlayer.id] && data.guesses[data.activePlayer.id].count + 1 === data.players.length) {
                                if (data.playerTurnIndex < data.players.length - 1) {
                                    await incrementPlayerTurnIndex({ gameData: data });
                                } else {
                                    await incrementGameStep({ gameData: data });
                                }
                            }
                    }
                    console.log('data in snapshot: ', data);
                    dispatch(Actions.setGameData(data));
                    return data;
                }
            });

        // const unsubscribePromptAnswers = realtimeDB.ref(`games/${gameId}/prompt_answers`)
        //     .on('value', async snapshot => {
        //         data.promptAnswers = snapshotListToMap(snapshot.child('prompt_answers'));
        //         data.pendingPlayers = getPendingPlayers(data.promptAnswers, data.players);
        //         if (data.pendingPlayers.length === 0) {
        //             // we should increment the step now
        //             await incrementGameStep({ gameData: data });
        //         }
        //     })
        // turn off snapshot listener
        return () => {
            unsubscribeGames();
            // unsubscribePlayers();
        };
    }, []);
};
