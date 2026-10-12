import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import SectionTitle from '../resume/SectionTitle';
import { RESPONSIVE_BOUNDARY } from '../../constants/constants';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;

    @media (max-width: ${RESPONSIVE_BOUNDARY}) {
        grid-template-columns: 1fr;
    }
`;

const Card = styled.article`
    background: var(--white);
    padding: 2rem;
    border-top: 0.4rem solid var(--dark-green);

    p {
        font-weight: 400;
        line-height: 1.6;
    }
`;

const Domain = styled.div`
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    color: var(--dark-green);
`;

const Name = styled.h3`
    font-weight: 500;
    margin: 0.5rem 0;
`;

const Meta = styled.div`
    font-size: 1.4rem;
    font-style: italic;
    margin-bottom: 1rem;
`;

const ResumeLink = styled(Link)`
    display: inline-block;
    margin-top: 1rem;
    font-size: 1.5rem;
    color: var(--dark-green);
`;

export default function SelectedWork(props) {
    const {
        work,
    } = props;

    return (
        <>
            <SectionTitle
                text="Selected Work"
            />
            <Grid>
                {work.map((item) => (
                    <Card key={item.name}>
                        <Domain>
                            {item.domain}
                        </Domain>
                        <Name>
                            {item.name}
                        </Name>
                        <Meta>
                            {item.role}, {item.company}
                        </Meta>
                        <p>
                            {item.summary}
                        </p>
                        <ResumeLink to="/resume">
                            Read more in resume
                        </ResumeLink>
                    </Card>
                ))}
            </Grid>
        </>
    );
}
