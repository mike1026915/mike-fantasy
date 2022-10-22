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

            {skills.map((skill, index) => {
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
                    <React.Fragment
                        key={`Skill_category_${index}`}
                    >
                        <div>
                            {category}
                        </div>
                        <TagList>
                            {
                                items.map((item, index) => {
                                    return (
                                        <Tag
                                            value={item}
                                            key={`Skill_${index}`}
                                        />
                                    )
                                 })
                            }
                        </TagList>

                    </React.Fragment>
                );
            })}

        </StyledSkills>
    )
}

export default Skills;
