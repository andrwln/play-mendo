import React from 'react';
import styled from 'styled-components';

export default function PlayerIcon(props) {
    const { isActive, playerIndex, playerName } = props;
    const playerInitial = playerName.substring(0, 1);
    return (
        <StyledIcon isActive={ isActive }>
            {playerInitial}
        </StyledIcon>
    );
}

const StyledIcon = styled.div.attrs(() => ({
    className: 'Styled-PlayerIcon',
}))`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 80px;
    border-radius: 20px;
    background-color: #000000;
    color: #ffffff;
    font-size: 60px;
    opacity: ${props => props.isActive ? '1' : '0.5'};
`;
