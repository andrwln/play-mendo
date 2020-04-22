import React from 'react';
import styled from 'styled-components';

export default function HelperText(props) {
    return (
        <StyledHelperText className='helperText'>{props.children}</StyledHelperText>
    );
}

const StyledHelperText = styled.div`
    position: absolute;
    width: 225px;
    font-family: 'Blanket of Snow';
    font-size: 30px;
    color: #EF7116;
    ::before {
        content: url('/img/orangearrow.svg');
        position: absolute;
    }
`;
