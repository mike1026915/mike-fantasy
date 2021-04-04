import React from 'react';

import Tag from '../Tag';
import TagList from '../TagList';

import SectionTitle from './SectionTitle';

function Hobby(props) {
    const {
        hobby,
    } = props;

    return (
        <>
            <SectionTitle
                text="Hobby"
            />
            <TagList>
                {
                    hobby.map((h) => (
                        <Tag
                            value={h}
                        />
                    ))
                }
            </TagList>

        </>
    )
}

export default Hobby;
