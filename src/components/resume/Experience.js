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

const Description = styled.div`
`;

const Lead = styled.p`
    margin: 0.2rem 0 0;
    font-style: italic;
    font-weight: 400;
`;

const EventList = styled.ul`
    margin: 0.4rem 0 0;
    padding-left: 2rem;
`;

const SectionList = styled(EventList)`
    li {
        font-weight: 400;
    }

    strong {
        font-weight: 700;
    }
`;

const SectionHeading = styled.h4`
    margin: 1.6rem 0 0.2rem;
    font-family: 'OpenSansBold', 'OpenSans', 'Roboto', 'Sora', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.75rem;
    font-style: normal;
    font-weight: 700;
`;

function renderInline(text) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);

    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return (
                <strong key={index}>
                    {part.slice(2, -2)}
                </strong>
            );
        }

        return part;
    });
}

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
        events = [],
        sections = []
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
                    <a href={url}>
                        {project}
                    </a>
                ) : null}
                {description ? (
                    sections.length > 0 ? (
                        <Lead>
                            {description}
                        </Lead>
                    ) : (
                        <>
                            <br />
                            {description}
                        </>
                    )
                ) : null}
            </Description>
            {sections.length > 0 ? (
                sections.map((section) => (
                    <div key={section.title}>
                        <SectionHeading>
                            {section.title}
                        </SectionHeading>
                        <SectionList>
                            {section.events.map((event, index) => (
                                <li key={`${section.title}-${index}`}>
                                    {renderInline(event)}
                                </li>
                            ))}
                        </SectionList>
                    </div>
                ))
            ) : (
                <EventList>
                    {events.map((event, index) => (
                        <li key={index}>
                            {renderInline(event)}
                        </li>
                    ))}
                </EventList>
            )}
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
                    experience.map((e, index) => {
                        return (
                            <ExperienceItem
                                { ...e }
                                key={`experience_${index}`}
                            />
                        )
                    })
                }
            </ExperienceItems>
        </>
    )
}

export default Experience;
