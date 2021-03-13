import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { VscDebugReverseContinue } from "react-icons/vsc";

import Me from './Me';
import Menus from './Menus';
import Contacts from './Contacts';

const StyledSideBar = styled.aside`

    background-color: var(--dark-green);
    min-height: 100vh;
    transition: all 0.5s ease 0s;
    z-index: 1;
    top: 0;
    left: 0;
    position: fixed;

    @media (min-width: 100vh) {
        width: var(--side-panel-size);
        padding-left: var(--side-panel-left-padding);
        padding-right: var(--side-panel-right-padding);

        .switch {
            visibility: hidden;
        }
    }

    @media (max-width: 100vh)  {
        width: ${(props) => (props.isOpen ? 'var(--side-panel-size)' : '50px' )};
        padding-left: ${(props) => (props.isOpen ? 'var(--side-panel-left-padding)' : '0' )};
        padding-right: ${(props) => (props.isOpen ? 'var(--side-panel-right-padding)' : '0' )};

        .content {
            display: ${(props) => (props.isOpen ? 'flex' : 'none' )};
        }

        .switch {
            border: 2px;
            border-radius: 5px;
            border-color: var(--grey);
            border-style: solid;
            padding: 5px;
            margin: ${(props) => (props.isOpen ? '15px 8px' : '8px 8px' )};
            transform: ${(props) => (props.isOpen ? 'rotate(0)' : 'rotate(180deg)' )};
            transition: transform 0.5s ease 0s;
            cursor: pointer;

            :hover {
                opacity: 0.7;
            }

            ${(props) => (props.isOpen ? '' : `
                top: 0;
                left: 0;
                position: fixed;`
            )};
        }
    }
`

const StyledSwitch = styled.div`
        padding: 5px;
        min-height: 80px;
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
`

const StyledSideBarContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1rem;
`

export default function Sidebar(props) {

    let [isOpen, setIsOpen] = useState(false);
    let domRef = useRef(null);
    const _handleOnClick = useCallback(() => {
        setIsOpen(!isOpen)
    });

    useEffect(() => {
        const onTransitionStart = (event) => {
            const transformMatrixList = window.getComputedStyle(domRef.current.firstChild)
                .getPropertyValue('transform').slice(7, -1).split(',').map(x => parseInt(x, 10));

            if (
                transformMatrixList[0] === 1 &&
                transformMatrixList[1] === 0 &&
                transformMatrixList[2] === 0 &&
                transformMatrixList[3] === 1
                ) {
                    setIsOpen(false)
                }
        };

        domRef.current.addEventListener('transitionstart', onTransitionStart);

            return () => {
                domRef.current.removeEventListener('transitionend', onTransitionStart);
            };
    }, [domRef]);

    return (
        <StyledSideBar
            isOpen={isOpen}
        >
            <StyledSwitch
                ref={domRef}
            >
                <VscDebugReverseContinue
                    className="switch"
                    onClick={_handleOnClick}
                />
            </StyledSwitch>
            <StyledSideBarContent
                className="content"
            >
                <Me/>
                <Menus />
                <Contacts />
                {/*<p> copyright </p>*/}
            </StyledSideBarContent>
        </StyledSideBar>
    )
}