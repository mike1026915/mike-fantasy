import React from 'react';

import styled from 'styled-components';

const StyledContent = styled.main`
    background-color: var(--light-grey);
    height: 100vh;
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