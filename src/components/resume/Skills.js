import React from 'react';
import styled from 'styled-components';

import Tag from '../Tag';
import TagList from '../TagList';

import SectionTitle from './SectionTitle';

const StyledSkills = styled.div`
    margin-bottom: 3rem;
`;

const SkillCategory = styled.h3`
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
                const {
                    items,
                    title,
                } = skill;
                const category = (
                    <SkillCategory>
                        {title}
                    </SkillCategory>
                );

                return (
                    <>
                        <div>
                            {category}
                        </div>
                        <TagList>
                            {
                                items.map((item) => {
                                    return (
                                        <Tag
                                            value={item}
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
