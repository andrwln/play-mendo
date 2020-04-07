import { useEffect } from 'react';
import { db, realtimeDB, getPlayersData, getTopicData } from '.';
import { useStore } from '../store/useStore';
import { Actions } from '../store/actions';
import { snapshotListToArray, snapshotListToMap, getPendingPlayers } from '../utils';
import { incrementGameStep, incrementPlayerTurnIndex } from '../gameController';

export const useGameSnapshot = (gameId) => {
    const { dispatch } = useStore();

    useEffect(() => {
        const unsubscribeGames = realtimeDB.ref(`games/${gameId}`)
            .on('value', async snapshot => {
                if (snapshot && snapshot.exists) {
                    const data = snapshot.val();
                    data.players = snapshotListToArray(snapshot.child('players'));
                    data.topicData = await getTopicData(data.topicId);

                    switch(data.stepIndex) {
                        case 0:
                            break;
                        case 1:
                            data.promptAnswers = snapshotListToMap(snapshot.child('prompt_answers'));
                            data.pendingPlayers = getPendingPlayers(data.promptAnswers, data.players);

                            break;
                        case 2:
                            data.guesses = {};
                            data.activePlayer = data.players[data.playerTurnIndex];
                            data.promptAnswers = snapshotListToMap(snapshot.child('prompt_answers'));
                            // there is a list of guesses for each player
                            // create a map of guesses by player ID, with each player having a list of
                            // guesses from other players
                            snapshot.child('guesses').forEach(playerIdSnapshot => {
                                data.guesses[playerIdSnapshot.key] = snapshotListToMap(playerIdSnapshot);
                            });
                    }
                    console.log('SETTING GAME DATA TO STORE: ', data);
                    dispatch(Actions.setGameData(data));
                }
            });

        // turn off snapshot listener
        return () => {
            unsubscribeGames();
        };
    }, []);
};
