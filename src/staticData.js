import { generateSixDigitId } from './utils';

export function generateAnswerObject() {
    return {
        id: generateSixDigitId(),
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
        topic: '',
        answers: [
            generateAnswerObject(),
        ],
    };
};