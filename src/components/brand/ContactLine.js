import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const StyledContactLine = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    padding: 2rem 0;
    border-top: 0.2rem solid var(--light-green);
    font-size: 1.75rem;

    a {
        color: var(--dark-green);
    }
`;

export default function ContactLine(props) {
    const {
        contacts,
    } = props;

    return (
        <StyledContactLine>
            <a
                href={contacts.linkedin.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                LinkedIn
            </a>
            <a href={contacts.email.link}>
                {contacts.email.text}
            </a>
            <Link to="/resume">
                Full resume
            </Link>
        </StyledContactLine>
    );
}
