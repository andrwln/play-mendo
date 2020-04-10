import React from 'react';
import { useStore } from '../store/useStore';
import { Actions } from '../store/actions';
import { generateAnswerObject } from '../staticData';
import { createTopic } from '../database';

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
    function handleSubmitTopic() {
        createTopic(topicData);

    }
    function handleUpdateAnswer(e, answerIndex, answer, field) {
        const value = e.target.value;
        const newAnswer = { ...answer, [field]: value };
        const newAnswers = [ ...answers ];
        newAnswers[answerIndex] = newAnswer;
        dispatch(Actions.setTopicData({
            ...topicData,
            answers: newAnswers,
        }));
    }
    function handleTopicChange(val, field) {
        dispatch(Actions.setTopicData({
            ...topicData,
            [field]: val,
        }));
    }
    return (
        <div>
            <div>Topic:
                <input value={ topic.topic } onChange={ e => handleTopicChange(e.target.value, 'topic') } />
                Description: <input value={ topic.description } onChange={ e => handleTopicChange(e.target.value, 'description') } />
            </div>
            Answers:
            {answers.map((answer, i) => {
                const lastField = (answers.length - 1) === i;
                return (
                    <div key={ `answer-field-${i}` }>
                        label: <input value={ answer.label } onChange={ e => handleUpdateAnswer(e, i, answer, 'label') } />
                        description: <input value={ answer.description } onChange={ e => handleUpdateAnswer(e, i, answer, 'description') } />
                        {lastField && <button onClick={ addAnswerField }>+</button>}
                    </div>
                );
            })}
            <button onClick={ handleSubmitTopic }>Submit</button>
        </div>
    );
}
