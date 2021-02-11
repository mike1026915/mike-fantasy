import React from 'react';

import styled from 'styled-components';

const StyledContent = styled.main`
    background-color: var(--light-grey);
    height: 100vh;
    width: 100%;
    justify-content: center;
    align-items: center;
`

export default function Sidebar() {

    return (
        <StyledContent>
            <h1>
                <em>
                    Try my best to <br />
                    do the right things  <br />
                    with the right people  <br />
                    then  <br />
                    enjoy the life  <br />
                    at ease!  <br />
                </em>
            </h1>
        </StyledContent>
    )
}