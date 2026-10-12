import React from 'react';
import styled from 'styled-components';

import { RESPONSIVE_BOUNDARY } from '../../constants/constants';

const List = styled.ul`
    display: flex;
    gap: 2rem;
    margin: 2.5rem 0;
    padding: 0;

    @media (max-width: ${RESPONSIVE_BOUNDARY}) {
        flex-direction: column;
    }
`;

const Item = styled.li`
    list-style-type: none;
    flex: 1;
    padding: 0 0 0 1.5rem;
    border-left: 0.4rem solid var(--light-green);
    font-weight: 400;
`;

const Value = styled.div`
    font-size: 3.2rem;
    color: var(--dark-green);
`;

const Domain = styled.div`
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    margin-top: 0.5rem;
`;

export default function ProofPoints(props) {
    const {
        proofPoints,
    } = props;

    return (
        <List>
            {proofPoints.map((point) => (
                <Item key={point.text}>
                    <Value>
                        {point.value}
                    </Value>
                    {point.text}
                    <Domain>
                        {point.domain}
                    </Domain>
                </Item>
            ))}
        </List>
    );
}
