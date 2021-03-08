import React from 'react';

import styled from 'styled-components';

const StyledContent = styled.main`
    background-color: var(--light-grey);
    min-height: 100vh;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`

export default function Sidebar(props) {
    return (
        <StyledContent>
            {props.children}
        </StyledContent>
    )
}