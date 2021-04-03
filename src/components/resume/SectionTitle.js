import React from 'react';
import styled from 'styled-components';

const StyledSectionTitle = styled.h2`
    margin-bottom: 1.5rem;
    border-bottom: 1rem solid var(--light-green);
`;

function SectionTitle(props) {
    const {
        text,
    } = props;

    return (
        <StyledSectionTitle>
            {text}
        </StyledSectionTitle>
    )
}

export default SectionTitle;