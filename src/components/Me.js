import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import useSiteMetadata from '../hooks/useSiteMetadata';

const StyledMe = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 1.5rem;

    q::before {
        content: '\\201C';
    }

    q::after {
        content: '\\201D';
    }
`

const StyledName = styled.div`
    font-size: 3rem;
    font-style: bold;
`;

const StyledQuote = styled.q`
    font-size: 1rem;
    font-style: italic;
    margin: 0.5rem 30% 0 0;
    line-height: 2.1rem;
    letter-spacing: 0.1rem;
`;


export default function Me(props) {
    const {
        siteMetadata,
        profilePicture,
    } = useSiteMetadata();
    const {
        name, intro
    } = siteMetadata;

    return (
        <StyledMe>
            <Img
                fluid={profilePicture}
                alt="Mike Picture"
                title="Mike Fang"
                draggable={false}
                style={{
                    borderRadius: "15%",
                    width: "25vh",
                    height: "25vh",
                    margin: "1.5rem 0"
                }}

            />
            <StyledName>
                {name}
            </StyledName>
            <StyledQuote>
                {intro}
            </StyledQuote>
        </StyledMe>
    );
}