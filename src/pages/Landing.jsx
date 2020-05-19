import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { StyledPageContainer } from './styles';
import useWindowSize from '../useWindowSize';
import CreateTopic from '../components/CreateTopic';
import CreatedByFooter from '../components/CreatedByFooter';

export default function Lobby(props) {
    function redirectTo(location) {
        props.history.push(`/${location}`);
    }
    const isMobile = useWindowSize('isMobileView');
    return (
        <LandingPageContainer>
            <div className='headerSection'>
                <img src='/img/logo.svg' />
            </div>
            {isMobile ?
                <MobileViewDisplay /> :
                <>
                    <div className='mainSection'>
                        <div className='welcome'>Welcome to Mendo</div>
                        <div className='welcomeMessage'>Welcome to Mendo, the premier group guessing game for those who have run out of everything else to do!</div>
                        <div className='welcomeMessage'>The goal is simple — do you know your friends well enough to guess their answers?<br />Discussion and debates are highly encouraged.</div>
                        <div className='buttonContainer'>
                            <Button className='host' onClick={ () => redirectTo('host') }>Host new game</Button>
                            <Button className='join' onClick={ () => redirectTo('join') }>Join existing game</Button>
                        </div>
                        <div className='orange'>Create a room as a host or Join a room as a player</div>
                    </div>
                    <div className='footerSection'>
                        <CreatedByFooter />
                    </div>
                </>}
        </LandingPageContainer>
    );
}

const MobileViewDisplay = () => {
    return (
        <div className='mainSection' style={ {fontSize: '20px', lineHeight: 1.5} }>
            Looks like you're visiting us from a mobile device! Mendo is best experienced from tablet or desktop screen sizes.
        </div>
    );
};

const LandingPageContainer = styled(StyledPageContainer)`
    .headerSection {
        height: 28%;
    }
    .mainSection {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80%;
        .welcome {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .welcomeMessage {
            font-size: 24px;
            margin-bottom: 40px;
            width: 60%;
        }
        .buttonContainer {
            display: flex;
            margin: 20px 0;
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
        .orange {
            color: #E8863F;
        }
    }
    .footerSection {
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 10%
    }
`;
