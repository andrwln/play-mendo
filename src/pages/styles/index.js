import styled from 'styled-components';

export const StyledPageContainer = styled.div.attrs(() => ({
    className: 'Styled-Container',
}))`
    padding: 16px 32px;
    text-align: center;
    box-sizing: border-box;
    height: 100%;
    .headerSection {
        height: 30%;
        img {
            height: 100%;
        }
    }
    .mainSection {
        box-sizing: border-box;
        height: 50%;
        padding: 20px;
    }
    .footerSection {
        height: 20%;
    }
    .fixedSubmitBtn {
        position: fixed;
        bottom: 25px;
        right: 25px;
        width: 100px;
        height: 40px;
    }
`;
