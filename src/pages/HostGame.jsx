import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useStore } from '../store/useStore';
import { StyledPageContainer } from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import { initiateNewGame } from '../gameController';
import { getAllTopics } from '../database';
import { snapshotListToArray, generateTopicSelectOptions } from '../utils';
import CreateTopic from '../components/CreateTopic';

export default function HostGame(props) {
    const { state, dispatch } = useStore();
    const [playerName, setName] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const buttonDisabled = playerName.length === 0;
    async function startNewGame() {
        // start new game and redirect user to game game lobby page
        const gameId = await initiateNewGame({ playerName, topicId: selectedTopic, dispatch });
        props.history.push(`/game/${gameId}`);
    }
    useEffect(() => {
        async function getTopicsList() {
            const topicsSnapshot = await getAllTopics();
            const topicsArray = snapshotListToArray(topicsSnapshot);
            const topicsAsSelectOptions = generateTopicSelectOptions(topicsArray);
            console.log('topics: ', topicsArray);
            setTopics(topicsAsSelectOptions);
        }
        getTopicsList();
    }, []);
    return (
        <StyledPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
            </div>
            <div className='mainSection'>
                {/* <CreateTopic /> */}
                <div>
                    <Input placeholderText='Set Your Player Name' handleInputChanged={ setName } />
                </div>
                <div>
                    <Select
                        options={ topics }
                        onChange={ selected => setSelectedTopic(selected.value) }
                        placeholder='Choose a theme...'
                        styles={ selectStyles }
                    />
                </div>
            </div>
            <div className='footerSection'>
                <StyledButtonContainer>
                    <Button className='startGame' disabled={ buttonDisabled } onClick={ startNewGame }>Create game</Button>
                    <div className='createdBy'>created by JDAK</div>
                </StyledButtonContainer>
            </div>
        </StyledPageContainer>
    );
}

const StyledButtonContainer = styled.div.attrs(() => ({
    className: 'Styled-ButtonContainer',
}))`
    display: inline-block;
    width: 360px;
    height: 64px;
    .startGame {
        margin-bottom: 10px;
    }
    .createdBy {
        font-size: 12px;
    }
`;

const selectStyles = {
    container: provided => ({
        ...provided,
        width: 360,
        display: 'inline-block',
        fontSize: '20px',
    }),
    control: provided => ({
        ...provided,
        height: 64,
        border: '1px solid #000000',
        padding: '0 5px',

    }),
    menu: provided => ({
        ...provided,
        margin: 0,

    }),
    ValueContainer: provided => ({
        ...provided,
        padding: '0 25px',
    }),
};


