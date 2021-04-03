import React from 'react';
import styled from 'styled-components';

import Tag from '../Tag';
import SectionTitle from './SectionTitle';

const StyledSkills = styled.div`
    width: 33.33%;
    min-height: 100px;
    border-left: 0.2rem solid var(--light-green);
    padding: 1rem 0 0 1.5rem;
    margin-top: 1rem;
`;

const SkillCategory = styled.h3`
`;

const TagList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem;

    .tag {
        margin: 0.5rem;
    }

    :not(:last-child) {
        border-bottom: 0.5rem solid var(--light-green);
        padding-bottom: 1rem;
        margin-bottom: 1.15rem;
    }
`;

function Skills(props) {
    const {
        skills,
    } = props;

    return (
        <StyledSkills>
            <SectionTitle
                text="Skills"
            />

            {skills.map((skill) => {
                const category = (
                    <SkillCategory>
                        {skill.title}
                    </SkillCategory>
                );
                return (
                    <>
                        <div>
                            {category}
                        </div>
                        <TagList>
                            {
                                skill.items.sort((a,b) => (a.length - b.length)).map((item) => {
                                    return (
                                        <Tag
                                            value={typeof item === 'object' ? item.name : item}
                                        />
                                    )
                                })
                            }
                        </TagList>

                    </>
                );
            })}

        </StyledSkills>
    )
}

export default Skills;
