import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { StyledPageContainer } from './styles';
import CreateTopic from '../components/CreateTopic';

export default function Lobby(props) {
    function redirectTo(location) {
        props.history.push(`/${location}`);
    }
    return (
        <LandingPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
            </div>
            <div className='mainSection'>
                <div className='startingText'>
                    <div><strong>Ready to get started?</strong></div>
                    <div>Create a room as a host or Join a room as a player</div>
                </div>
                <div className='buttonContainer'>
                    <Button className='host' onClick={ () => redirectTo('host') }>Host new game</Button>
                    <Button className='join' onClick={ () => redirectTo('join') }>Join existing game</Button>
                </div>
            </div>
            <CreateTopic />
            <div className='footerSection'>created by JDDAK</div>
        </LandingPageContainer>
    );
}

const LandingPageContainer = styled(StyledPageContainer)`
    .mainSection {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .startingText {
            text-align: left;
            width: 400px;
            font-size: 32px;
            > div {
                padding: 15px
            }
        }
        .buttonContainer {
            display: flex;
            .Styled-Button {
                height: 48px;
                width: 200px;
                margin-right: 16px;
            }
            .join {
                background-color: #ffffff;
                color: #000000;
                border: 1px solid #000000;
                &:hover {
                    background-color: #ededed;
                }
            }
        }
    }
    .footerSection {
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
    }
`;
