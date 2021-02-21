import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

import useSiteMetadata from '../hooks/useSiteMetadata';

const StyledMe = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50vh;
    q {
        margin: 1rem 5%;
    }

    q::before {
        content: '\\201C';
    }

    q::after {
        content: '\\201D';
    }

`

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
                    width: "auto",
                    height: "25vh",
                    margin: "5% 25%"
                }}

            />
            <h3>
                {name}
            </h3>
            <q>
                {intro}
            </q>
        </StyledMe>
    );
}