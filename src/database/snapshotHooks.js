import { useEffect } from 'react';
import { db, getPlayersData, getTopicData } from '.';
import { useStore } from '../store/useStore';
import { Actions } from '../store/actions';

export const useGameSnapshot = (gameId) => {
    const { dispatch } = useStore();
    useEffect(() => {
        const unsubscribeGames = db.collection('games').doc(gameId)
            .onSnapshot({
                includeMetadataChanges: true,
            }, async doc => {
                console.log('game snapshot updated with doc: ', doc.data());
                if (doc.exists) {
                    const data = doc.data();
                    // if (!data.players) data.players = await getPlayersData(gameId);
                    data.topicData = await getTopicData(data.topicId);
                    dispatch(Actions.setGameData(data));
                    return data;
                }
            });

        const unsubscribePlayers = db.collection(`games/${gameId}/players`)
            .onSnapshot({
                includeMetadataChanges: true,
            }, async snapshots => {
                const players = [];
                snapshots.forEach(doc => {
                    players.push({ ...doc.data(), playerId: doc.id });
                });
                console.log('updated players: ', players);
                dispatch(Actions.updateGameData({ players }));
            });

        // turn off snapshot listener
        return () => {
            unsubscribeGames();
            unsubscribePlayers();
        };
    }, []);
};
