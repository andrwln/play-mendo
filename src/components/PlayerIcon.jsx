import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { getPlayerIconData } from '../utils';

export default function PlayerIcon(props) {
    // const { isActive, playerName, showTooltip, icon, color } = props;
    const { isActive, player, showTooltip, iconData, players } = props;
    const { character, color } = getPlayerIconData(player.id, players, iconData);
    const [ isHovered, setIsHovered ] = useState(false);
    return (
        <StyledIcon
            isActive={ isActive }
            color={ color }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <img src={ `/img/${character}.svg` } />
            {showTooltip &&
            <TooltipContainer className={ isHovered || isActive ? 'show' : 'hide' }>
                {/* {playerName} */}
                {player.name}
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
    color: ${props => props.isActive ? '#000000' : '#ffffff'};
    font-size: 60px;
    background-color: ${props => props.isActive ? props.color : '#c4c4c4'};
`;

const TooltipContainer = styled.div.attrs({
    className: 'StyledTooltipContainer',
})`
    position: absolute;
    bottom: -42px;
    padding: 8px 16px;
    background-color: #ecbf4b;
    color: #000000;
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
