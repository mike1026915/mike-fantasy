import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Sidebar from './Sidebar';
import Content from './Content';

const Page = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: ${(props) => (props.isSidebarOpen ? 'minmax(31vh, 30%) 1fr' : '50px 1fr')};
`;

export default function Layout(props) {

    const domRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const shouldOpenSidebar = domRef.current ? domRef.current.clientWidth >= 500 : true

        if(domRef && domRef.current) {
            setIsSidebarOpen(shouldOpenSidebar);
        }
    }, []);

    useEffect(() => {
        const onResize = () => {
            const shouldOpenSidebar = domRef.current ? domRef.current.clientWidth >= 500 : true

            if (shouldOpenSidebar) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        if(domRef && domRef.current) {
            window.addEventListener('resize', onResize);

            return () => {
                window.removeEventListener('resize', onResize);
            };
        }
    }, [domRef]);

    const _handleSidebarSwitch = useCallback(() => {
        setIsSidebarOpen(!isSidebarOpen)
    }, [isSidebarOpen]);

    return (
        <>
            <GlobalStyles />
            <Typography />

            <Page
                ref={domRef}
                isSidebarOpen={isSidebarOpen}
            >
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    onClickSidebarSwitch={_handleSidebarSwitch}
                />
                <Content>
                    {props.children}
                </Content>
            </Page>
        </>
    );
}
