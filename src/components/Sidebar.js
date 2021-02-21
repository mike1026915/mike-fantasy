import React from 'react';
import styled from 'styled-components';

import Me from './Me';

const StyledSideBar = styled.aside`
    background-color: var(--dark-green);
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export default function Sidebar() {
    const s = {
    }
    return (
        <StyledSideBar>
            <Me/>
            <h2 style={s}> links </h2>
            <h3 style={s}> contact </h3>
            <p style={s}> copyright </p>
        </StyledSideBar>
    )
}