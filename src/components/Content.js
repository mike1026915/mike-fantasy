import React from 'react';

import styled from 'styled-components';

import { RESPONSIVE_BOUNDARY } from '../constants/constants';

const StyledContent = styled.main`
    background-color: var(--light-grey);
    min-height: 100vh;
    height: 100%;
    width: 100%;
    padding: 3%;
    transition: all 0.5s ease 0s;

    @media (min-width: ${RESPONSIVE_BOUNDARY}) {
        margin-left: calc(var(--side-panel-size) + var(--side-panel-left-padding) + var(--side-panel-right-padding));
    }

    @media (max-width: ${RESPONSIVE_BOUNDARY}) {
        margin-left: 50px;
    }
`

export default function Sidebar(props) {
    return (
        <StyledContent>
            {props.children}
        </StyledContent>
    )
}