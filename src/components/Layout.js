import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Sidebar from './Sidebar';
import Content from './Content';

const Page = styled.div`
    display: flex;
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
