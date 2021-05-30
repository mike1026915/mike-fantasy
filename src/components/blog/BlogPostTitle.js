import React from "react";
import styled from 'styled-components';
import { Link } from "gatsby"

import Tag from '../Tag';

const Title = styled.h2`
    letter-spacing: 0.05rem;
    word-spacing: 0.25rem;

    a {
        color: var(--dark-green);
        text-decoration: none;
    }
`;

const Tags = styled.div`
    display: flex;

    p {
        margin-right: 5px;
        font-size: 1rem
    }
`;

const Date = styled.h5`
    font-style: italic;
`

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
        slug,
    } = frontmatter;

    return (
        <div>
            <Tags>
                {tags.map((t)=>(<Tag value={t} />))}
            </Tags>
            <Title>
                <Link to={`/blogs/${slug}`}>  {title} </Link>
            </Title>
            <Date>
                {date}
            </Date>
            <p>
                {description}
            </p>
        </div>
    );

}