import React from 'react';
import styled from 'styled-components';

export default function CreatedBy() {
    return (
        <div style={ {paddingBottom: '10px'} }>
            created by JDDAK<StyledDivider>|</StyledDivider>Illustrations by Justin Graham<StyledDivider>|</StyledDivider><a href='/about'>About Us</a>
        </div>
    );
}

const StyledDivider = styled.span`
    display: inline-block;
    margin: 0 8px;
`;
