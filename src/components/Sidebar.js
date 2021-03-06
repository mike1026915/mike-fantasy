import React, { useState } from 'react';
import styled from 'styled-components';
import { VscDebugReverseContinue } from "react-icons/vsc";

import Me from './Me';
import Menus from './Menus';
import Contacts from './Contacts';

const StyledSideBar = styled.aside`
    background-color: var(--dark-green);
    min-height: 100vh;
    padding-left: 15%;

    .switch {
        border: 2px;
        border-radius: 5px;
        border-color: var(--grey);
        border-style: solid;
        padding: 5px;
        margin: 15px 8px;
        cursor: pointer;
    }
`
const StyledSideBarContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
`
const StyledSwitch = styled.span`
        padding: 5px 5px 0 0;
        display: flex;
        flex-direction: row-reverse;
`

const StyledClosedSideBar = styled.aside`
    background-color: var(--dark-green);
    min-height: 100vh;
    width: 100%;

    .switch {
        border: 2px;
        border-radius: 5px;
        border-color: var(--grey);
        border-style: solid;
        padding: 5px;
        margin: 20px 8px;
        cursor: pointer;
        transform: rotate(180deg);

    }
`

export default function Sidebar(props) {
    const {
        isSidebarOpen,
        onClickSidebarSwitch,
    } = props;

    if(isSidebarOpen) {
        return (
            <StyledSideBar>
                <StyledSwitch>
                    <VscDebugReverseContinue
                        className="switch"
                        onClick={onClickSidebarSwitch}
                    />
                </StyledSwitch>
                <StyledSideBarContent>
                    <Me/>
                    <Menus />
                    <Contacts />
                    {/*<p> copyright </p>*/}
                </StyledSideBarContent>
            </StyledSideBar>
        )
    } else {
        return (
            <StyledClosedSideBar>
                <VscDebugReverseContinue
                    className="switch"
                    onClick={onClickSidebarSwitch}
                />
            </StyledClosedSideBar>
        );
    }


}