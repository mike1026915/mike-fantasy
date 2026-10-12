import React from 'react';
import styled from 'styled-components';

const StyledHero = styled.header`
    border-bottom: 0.2rem solid var(--light-green);
    padding-bottom: 2rem;
`;

const Name = styled.h1`
    margin-bottom: 0.5rem;
`;

const Title = styled.h3`
    margin-bottom: 1.5rem;
`;

const Line = styled.p`
    font-size: 2.4rem;
    line-height: 1.5;
    font-weight: 400;
    max-width: 80rem;
`;

export default function Hero(props) {
    const {
        name,
        chineseName,
        title,
        line,
    } = props;

    return (
        <StyledHero>
            <Name>
                {chineseName} {name}
            </Name>
            <Title>
                {title}
            </Title>
            <Line>
                {line}
            </Line>
        </StyledHero>
    );
}
