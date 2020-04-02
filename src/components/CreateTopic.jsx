import React from 'react';
import { useStore } from '../store/useStore';
import { Actions } from '../store/actions';
import { generateAnswerObject } from '../staticData';

export default function CreateTopic() {
    const { state, dispatch } = useStore();
    const topicData = state.topicData;
    const { answers, topic } = topicData;
    function addAnswerField() {
        const newAnswers = [...answers];
        newAnswers.push(generateAnswerObject());
        dispatch(Actions.setTopicData({
            ...topicData,
            answers: newAnswers,
        }));
    }
    function handleUpdateAnswer(e, answerIndex, answer) {
        const value = e.target.value;
        const newAnswer = { ...answer, label: value };
        const newAnswers = [ ...answers ];
        newAnswers[answerIndex] = newAnswer;
        console.log('new answers: ', newAnswers);
        dispatch(Actions.setTopicData({
            ...topicData,
            answers: newAnswers,
        }));
    }
    function handleTopicChange(val) {
        dispatch(Actions.setTopicData({
            ...topicData,
            topic: val,
        }));
    }
    return (
        <div>
            <div>Topic: <input value={ topic.answer } onChange={ e => handleTopicChange(e.target.value) } /></div>
            Answers:
            {answers.map((answer, i) => {
                const lastField = (answers.length - 1) === i;
                return (
                    <div key={ `answer-field-${i}` }>
                        <input value={ answer.label } onChange={ e => handleUpdateAnswer(e, i, answer) } /> {lastField && <button onClick={ addAnswerField }>+</button>}
                    </div>
                );
            })}
        </div>
    );
}
