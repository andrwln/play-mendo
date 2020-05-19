import styled from 'styled-components';

export const StyledPageContainer = styled.div.attrs(() => ({
    className: 'Styled-Container',
}))`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 32px;
    text-align: center;
    box-sizing: border-box;
    height: 100%;
    background: url('/img/background.svg');
    background-size: 100%;
    .headerSection {
        height: 30%;
        img {
            height: 90%;
        }
    }
    .mainSection {
        box-sizing: border-box;
        min-height: 50%;
        max-width: 1000px;
        padding: 20px;
    }
    .footerSection {
        height: 20%;
        color: #828282
    }
    .fixedSubmitBtn {
        position: fixed;
        bottom: 25px;
        right: 25px;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        font-size: 16px;
        color: #000000;
        box-shadow: 1px 1px 5px grey;
        background-color: #ecbf4b;
        &:hover {
            background-color: #e0b546;
        }
        &.disabled {
            background-color: #c4c4c4;
            cursor: default;
        }
        
    }
`;
