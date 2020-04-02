export const Actions = {
    setPlayerData: (player) => ({ type: 'SET_PLAYER_DATA', player }),
    setGameId: (gameId) => ({ type: 'SET_GAME_ID', gameId }),
    setGameData: (gameData) => ({ type: 'SET_GAME_DATA', gameData }),
    updateGameData: (data) => ({ type: 'UPDATE_GAME_DATA', data }),
    setTopicData: (topicData) => ({ type: 'SET_TOPIC_DATA', topicData }),
    // increment: state => ({ count: state.count + 1 }),
    // decrement: state => ({ count: state.count - 1 })
};
