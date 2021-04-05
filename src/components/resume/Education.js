import React from 'react';
import styled from 'styled-components';

import SectionTitle from './SectionTitle';

const StyledEducationItem = styled.div`

`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const Location = styled.h4`
    font-style: italic;
    font-size: 1.5rem;
`;

const SchoolName = styled.h4`

`;

const Degree = styled.h3`
    text-decoration: underline;
`;

const Period = styled.div`
    font-style: italic;
    font-size: 1.5rem;
`;

const Thesis = styled.ul`
    li {
        font-weight: 100;
        font-family: 'Montserrat', 'Sora', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }
`;


const ExperienceItem = (props) => {
    const {
        degree,
        school,
        location,
        score,
        gpa,
        start,
        end,
        thesis,
        url,
    } = props;

    const thesisComponent = thesis ? (
        <Thesis>
            <li> Thesis: {thesis} </li>
        </Thesis>
    ) : null;

    return (
        <>
            <Header>
                <Degree>
                    {degree}
                </Degree>
                <Period>
                    {start} - {end}
                </Period>
            </Header>
            <Header>
                <SchoolName>
                    <a href={url}> {school} </a>
                </SchoolName>
                <Location>
                    {location}
                </Location>
            </Header>

            {thesisComponent}
        </>
    )
}

const EducationItems = styled.div`

`;

function Education(props) {
    const {
        education,
    } = props;

    return (
        <>
            <SectionTitle
                text="Education"
            />
            <EducationItems>
                {
                    education.map((e) => {
                        return (
                            <ExperienceItem
                                { ...e }
                            />
                        )
                    })
                }
            </EducationItems>
        </>
    )
}

export default Education;
