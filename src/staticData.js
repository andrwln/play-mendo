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