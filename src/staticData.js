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

export const characterList = ['cactus', 'coffeemug', 'robot', 'shark', 'snail', 'spork', 'pizzaunicycle', 'trenchcoatkids', 'bowtiellama', 'spaceman', 'skeleton', 'bullwaiter', 'elephantracer', 'pigbananasuit', 'catunicornonesie', 'surferbird'];
// export const colorList = ['#ec4bdc', '#24b670', '#4b8bec', '#ef7116', '#a32896', '#a4d90d', '#ec4b4b'];
export const colorList = ['#4B8BEC', '#CA4CC6', '#EF7116', '#BF4641', '#d86770', '#1EAEA2', '#AFD646', '#d78487', '#E35656', '#FAA262', '#D075CD', '#6A99E4'];

export const waitingMessages = [
    'We need these guys to get their shit together:',
    'How much longer are these people going to make us wait?',
    'Is this what growing old feels like?',
    'Tell these people to hurry up!',
    'List of sandbaggers below:',
    'Some people push the team forward while some people pull the team back:',
    'I bet the people below take forever to pick a restaurant.',
    'Hell freezing over, pigs flying, and these players selecting an answer:',
    'Your biggest enemy is yourself. Your biggest inconveniences are below:',
    'Check out our new turtle exhibit:',
    'Check out our new snail exhibit:',
    'Check out our new slug exhibit:',
    'You know marathons stop runners if they take too much time? Maybe we should do it in Mendo for these players:',
    'A watched pot never boils. A watched Mendo group needs to hurry up:',
    'Send your friends some Imodium. These guys need to get their shit together:',
    'Remember how you had to wait for everyone in the class to finish before you went to recess? This is one of those times.',
    'Are we ready yet? Are we ready yet? ARE WE READY YET?',
    'I’m not saying this is a game show, but if you had to identify the weakest link…',
    'Just waiting on these players:',
];
