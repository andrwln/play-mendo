import React, { useState } from 'react';
import styled, { css } from 'styled-components';

export default function PlayerIcon(props) {
    const { isActive, playerIndex, playerName, showTooltip } = props;
    const [ isHovered, setIsHovered ] = useState(false);
    const playerInitial = playerName.substring(0, 1);
    return (
        <StyledIcon
            isActive={ isActive }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            {/* {playerInitial} */}
            <img src='/img/coffeemug.svg' />
            {showTooltip &&
            <TooltipContainer className={ isHovered || !isActive ? 'show' : 'hide' }>
                {playerName}
                <TooltipArrow />
            </TooltipContainer>}
        </StyledIcon>
    );
}

const StyledIcon = styled.div.attrs(() => ({
    className: 'Styled-PlayerIcon',
}))`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 80px;
    border-radius: 20px;
    background-color: #4b8bec;
    color: #000000;
    font-size: 60px;
    opacity: ${props => props.isActive ? '1' : '0.5'};
`;

const TooltipContainer = styled.div.attrs({
    className: 'StyledTooltipContainer',
})`
    position: absolute;
    bottom: -42px;
    padding: 8px 16px;
    background-color: #ecbf4b;
    color: #ffffff;
    border-radius: 5px;
    z-index: 199;
    font-size: 12px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 500ms, visibility 300ms;
    &.show {
        visibility: visible;
        opacity: 1
    }
`;

const TooltipArrow = styled.div.attrs({
    className: 'StyledTooltipArrow',
})`
    top: -10px;
    left: 50%;
    margin-left: -15px;
    border-width: 0 15px 15px;
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #ecbf4b;
    ${props =>
        props.position === 'top' &&
        css`
            border-width: 15px;
            border-bottom-color: transparent;
            border-top-color: #ecbf4b;
            top: 64px;
        `};
`;
