import React from 'react';
import styled from 'styled-components';

import SectionTitle from './SectionTitle';

const StyledExperienceItem = styled.div`

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

const CompanyName = styled.h4`
`;

const Role = styled.h3`
    text-decoration: underline;
`;

const Period = styled.div`
    font-style: italic;
    font-size: 1.5rem;
`;

const Description = styled.ul`
`;
const Project = styled.div`
    margin-top: 1.5rem;
`;

const EventList = styled.ul`

`;

const ExperienceItem = (props) => {
    const {
        role,
        company,
        location,
        project,
        url,
        start,
        end,
        description,
        events
    } = props;

    return (
        <>
            <Header>
                <Role>
                    {role}
                </Role>
                <Period>
                    {start} - {end}
                </Period>
            </Header>
            <Header>
                <CompanyName>
                    {company}
                </CompanyName>
                <Location>
                    {location}
                </Location>
            </Header>
            <Description>
                { project ? (
                    <>
                        <a href={url}>
                            {project}
                        </a>
                        <br/>
                    </>
                ) : null}
                {description}
            </Description>
            <EventList>
                {events.map((event) => {
                    return (
                        <li>
                            {event}
                        </li>
                    );
                })}
            </EventList>
        </>
    )
}

const ExperienceItems = styled.div`

`;

function Experience(props) {
    const {
        experience,
    } = props;

    return (
        <>
            <SectionTitle
                text="Experience"
            />
            <ExperienceItems>
                {
                    experience.map((e) => {
                        return (
                            <ExperienceItem
                                { ...e }
                            />
                        )
                    })
                }
            </ExperienceItems>
        </>
    )
}

export default Experience;
