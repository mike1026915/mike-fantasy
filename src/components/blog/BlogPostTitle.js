import React from "react";
import styled from 'styled-components';

import Tag from '../Tag';

const Title = styled.h1`
    letter-spacing: 0.15rem;
`;

const Tags = styled.div`
    display: flex;
`;

export default function BlogPostTitle(props) {
    const {
        post
    } = props;
    const {
        frontmatter
    } = post;

    const {
        title,
        date,
        tags,
        description,
    } = frontmatter;

    console.log(frontmatter)

    return (
        <div>
            <Tags>
                {tags.map((t)=>(<Tag value={t} />))}
            </Tags>
            <Title>
                {title}
            </Title>
            <h5>
                {date}
            </h5>
        </div>
    );

}