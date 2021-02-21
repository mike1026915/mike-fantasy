import React from 'react';
import styled from 'styled-components';

import Me from './Me';
import Menus from './Menus';

const StyledSideBar = styled.aside`
    background-color: var(--dark-green);
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    padding-left: 15%;
`

export default function Sidebar() {
    const s = {
    }
    return (
        <StyledSideBar>
            <Me/>
            <Menus />
            <h3 style={s}> contact </h3>
            <p style={s}> copyright </p>
        </StyledSideBar>
    )
}