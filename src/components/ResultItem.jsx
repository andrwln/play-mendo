import React from 'react';
import styled from 'styled-components';
import { Checkbox } from '../components/Checkbox';

export default function ResultItem(props) {
    return (
        <StyledResultItem>
            <div className='itemLabelContainer'>
                <Checkbox />
                <label>{props.label}</label>
            </div>
            <div className='votesContainer'>
                List of votes
            </div>
        </StyledResultItem>
    );
}

const StyledResultItem = styled.div.attrs(() => ({
    className: 'Styled-ResultItem',
}))`

`;
