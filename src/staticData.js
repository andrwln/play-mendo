import { generateDataId } from './utils';

export function generateAnswerObject() {
    return {
        id: generateDataId(),
        label: '',
        description: '',
        isSelected: false,
    };
}

// static data?
export const gameDefaults = {
    stepIndex: 0,
    playerTurnIndex: 0,
    promptAnswers: {},
    userGuesses: {},
};
export const getTopicDefaults = () => {
    return {
        id: generateDataId(),
        topic: '',
        answers: [
            generateAnswerObject(),
        ],
    };
};

export const characterList = ['cactus', 'coffeemug', 'robot', 'shark', 'snail', 'spork'];
export const colorList = ['#ec4bdc', '#24b670', '#4b8bec', '#ef7116', '#a32896', '#a4d90d', '#ec4b4b'];
