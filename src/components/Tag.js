import React from 'react';
import styled from 'styled-components';

const StyledTag = styled.p`
    width: fit-content;
    background: var(--dark-green);
    color: var(--light-grey);
    padding: 0.5rem;
    border-radius: 15px;
    font-size: 1.5rem;
`;

export default function Tag(props) {
    return (
        <StyledTag className="tag">
            {props.value}
        </StyledTag>
    );
}