import React from 'react';
import styled from 'styled-components';
import { StyledPageContainer } from './styles';
import CreatedByFooter from '../components/CreatedByFooter';

export default function About() {
    return (
        <AboutPageContainer>
            <div className='headerSection'>
                <div className='logoContainer'><img src='/img/logo.svg' /></div>
                <div className='topicTitle'>About Us</div>
            </div>
            <div className='mainSection'>
                <div>
                    Thanks for checking out Mendo! <a href='https://www.linkedin.com/in/jaclyn-hsiung/' rel='noopener noreferrer' target='_blank'>Jackie</a>, <a href='https://www.linkedin.com/in/hungdavid/' rel='noopener noreferrer' target='_blank'>David H.</a>, <a href='https://www.linkedin.com/in/david-shu/' rel='noopener noreferrer' target='_blank'>David S.</a>, <a href='https://www.linkedin.com/in/andrewlin90/' rel='noopener noreferrer' target='_blank'>Andrew</a>, and <a href='https://www.linkedin.com/in/katiechung/' rel='noopener noreferrer' target='_blank'>Katie</a> are thrilled you came over. We hope you and your friends have fun!
                </div><br />

                <div><strong>Why’d y’all make this?</strong></div>
                <div>We created this game after a video hangout with some of our closest friends. Half way through our power hour, we began guessing what each person would order at Mendocino Farms. Since the five of us had some time on our hands, we put together a web app to play in subsequent video hangs.</div>
                <br />
                <div>Special shout-out to <a href='https://www.linkedin.com/in/justingraham10/' rel='noopener noreferrer' target='_blank'>Justin</a> for making our characters a ridiculously adorable reality!</div>
            </div>
            <div className='footerSection'>
                <CreatedByFooter />
            </div>
        </AboutPageContainer>
    );
}

const AboutPageContainer = styled(StyledPageContainer)`
    text-align: left;
    .headerSection {
        width: 100%;
        max-width: 800px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0 25px;
        box-sizing: border-box;
        .logoContainer {
            width: auto;
            img {
                max-width: 225px;
            }
        }
        .topicTitle {
            font-size: 36px;
            font-weight: bold;
            padding: 10px 50px;
        }
    }
    .mainSection {
        max-width: 800px;
        height: 100%;
        padding-top: 100px;
        
    }
    .footerSection {
        font-size: 12px;
        height: auto;
    }
`;
