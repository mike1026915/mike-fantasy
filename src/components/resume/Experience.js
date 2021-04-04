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

const Location = styled.div`

`;

const CompanyName = styled.div`

`;

const Role = styled.div`

`;

const Period = styled.div`

`;

const Description = styled.div`

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
                <CompanyName>
                    {company}
                </CompanyName>
                <Location>
                    {location}
                </Location>
            </Header>
            <Header>
                <Role>
                    {role}
                </Role>
                <Period>
                    {start} - {end}
                </Period>
            </Header>
            <Description>
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
