import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useStore } from '../store/useStore';
import Cookies from 'js-cookie';
import { StyledPageContainer } from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import { initiateNewGame } from '../gameController';
import { getAllTopics } from '../database';
import { snapshotListToArray, generateTopicSelectOptions } from '../utils';

export default function HostGame(props) {
    const { state, dispatch } = useStore();
    const [playerName, setName] = useState('');
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [hasStartedGame, setHasStartedGame] = useState(false);
    const buttonDisabled = playerName.length === 0 || hasStartedGame;
    async function startNewGame() {
        // start new game and redirect user to game game lobby page
        setHasStartedGame(true);
        const { gameId, player } = await initiateNewGame({ playerName, topicId: selectedTopic, dispatch });
        console.log('setting cookie for host: ', player);
        Cookies.set('player', player);
        props.history.push(`/game/${gameId}`);
    }
    function handlePlayerNameChanged(val) {
        const validatedName = val.substring(0, 16).replace(/ /g, '');

        setName(validatedName);
    }
    useEffect(() => {
        async function getTopicsList() {
            const topicsSnapshot = await getAllTopics();
            const topicsArray = snapshotListToArray(topicsSnapshot);
            const topicsAsSelectOptions = generateTopicSelectOptions(topicsArray);
            setTopics(topicsAsSelectOptions);
        }
        getTopicsList();
    }, []);
    return (
        <HostPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
            </div>
            <div className='mainSection'>
                {/* <CreateTopic /> */}
                <div>
                    <Input placeholderText='Set Your Player Name' value={ playerName } handleInputChanged={ handlePlayerNameChanged } />
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
                </StyledButtonContainer>
                <div className='createdBy'>created by JDDAK &nbsp;&nbsp;&nbsp;| &nbsp;&nbsp;&nbsp;Illustrations by Justin Graham</div>
            </div>
        </HostPageContainer>
    );
}

const HostPageContainer = styled(StyledPageContainer)`
    .mainSection {
        padding-top: 50px;
    }
    .footerSection {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
    }
`;

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
        fontSize: 16,
        textAlign: 'left',

    }),
    ValueContainer: provided => ({
        ...provided,
        padding: '0 25px',
    }),
};


