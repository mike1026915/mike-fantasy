import React, { useState } from 'react';
import styled from 'styled-components';

import Me from './Me';
import Menus from './Menus';
import Contacts from './Contacts';

const StyledHiddenSideBar = styled.aside`
    background-color: var(--dark-green);
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
    padding-left: 30%;
`

export default function HiddenSidebar() {

    return (
        <StyledHiddenSideBar>
            <Me/>
            <Menus />
            <Contacts />
            {/*<p> copyright </p>*/}
        </StyledHiddenSideBar>
    )
}