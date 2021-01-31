import React from 'react';
import styled from 'styled-components';

import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

const Content = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: minmax(150px, 25%) 1fr;
    background-size: 100%;
    gap: 1rem;


`;

export default function Layout(props) {
    return (
        <>
            <GlobalStyles />
            <Typography />

            <Content>
                <aside>
                sdfsdfsdf
                </aside>
                <main>
                    {props.children}
                </main>
            </Content>
        </>
    );
}
