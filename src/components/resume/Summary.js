import React from 'react';
import styled from 'styled-components';

import { SiHtml5 } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";

import { RESPONSIVE_BOUNDARY } from '../../constants/constants';

const StyleSummary = styled.p`
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 0.2rem solid var(--light-green);
    font-size: 1.75rem;
    letter-spacing: .025em;
    line-height: 1.625;
    font-family: 'Montserrat', 'sora', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`

const StyleSummaryContent = styled.div`
    display: flex;
`
const StyleLeft = styled.div`

    @media (min-width: ${RESPONSIVE_BOUNDARY}) {
        padding-left: 1rem;
        padding-right: 2rem;
        border-right: 0.15rem solid var(--light-green);
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        svg {
            margin-bottom: 10px;
        }
        svg:last-child {
            margin-bottom: 0;
        }
    }

    @media (max-width: ${RESPONSIVE_BOUNDARY}) {
        display: none;
        border-left: none;
    }


`
const StyleRight = styled.div`
    padding-right: 3rem;
    padding-left: 2rem;
`

const Summary = (props) => {
    const {
        summary,
    } = props;

    return (
        <StyleSummary>
            <StyleSummaryContent>
                <StyleLeft>
                    <SiPython />
                    <SiHtml5 />
                    <SiReact
                        style={{
                            strokeWidth: 0.5,
                        }}
                    />
                    <FaNodeJs
                        style={{
                            strokeWidth: 0.8,
                        }}
                    />
                </StyleLeft>
                <StyleRight>
                    {summary}
                </StyleRight>
            </StyleSummaryContent>

        </StyleSummary>
    );
};

export default Summary;
