import React, { createContext, useReducer, useContext } from 'react';
import { getTopicDefaults } from '../staticData';

const initialState = {
    playerData: null,
    gameData: null,
    gameId: null,
    topicData: getTopicDefaults(),
};

const StoreContext = createContext(initialState);

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_PLAYER_DATA':
            return {
                ...state,
                playerData: action.player,
            };
        case 'SET_GAME_ID':
            return {
                ...state,
                gameId: action.gameId,
            };
        case 'SET_GAME_DATA':
            return {
                ...state,
                gameData: action.gameData,
            };
        case 'UPDATE_GAME_DATA':
            return {
                ...state,
                ...action.data,
            };
        case 'SET_TOPIC_DATA':
            return {
                ...state,
                topicData: action.topicData,
            };
    }
};

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={ { state, dispatch } }>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = store => {
    const { state, dispatch } = useContext(StoreContext);
    return { state, dispatch };
};