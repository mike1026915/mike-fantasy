import React from 'react';
import styled from 'styled-components';

const StyledSideBar = styled.aside`
    background-color: var(--dark-green);
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`

export default function Sidebar() {

    return (
        <StyledSideBar>
            <h2>
                Mike Fang
            </h2>
        </StyledSideBar>
    )
}