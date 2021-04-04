import React from 'react';
import styled from 'styled-components';

const StyledTag = styled.p`
    width: fit-content;
    background: var(--dark-green);
    color: var(--light-grey);
    padding: 0.75rem;
    border-radius: 15px;
    font-size: 1.5rem;

    :hover {
        color: var(--dark-grey);
        background: var(--light-green);
        cursor: pointer;
    }
`;

export default function Tag(props) {
    return (
        <StyledTag className="tag">
            {props.value}
        </StyledTag>
    );
}