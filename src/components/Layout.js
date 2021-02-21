import React from 'react';
import styled from 'styled-components';

import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Sidebar from './Sidebar';
import Content from './Content';

const Page = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: minmax(150px, 36%) 1fr;
    place-items: center;
`;

export default function Layout(props) {
    return (
        <>
            <GlobalStyles />
            <Typography />

            <Page>
                <Sidebar />
                <Content>
                    {props.children}
                </Content>
            </Page>
        </>
    );
}
