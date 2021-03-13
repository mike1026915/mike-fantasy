import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import useSiteMetadata from '../hooks/useSiteMetadata';


const StyledUl = styled.nav`
    padding: 0;
    margin: 0;
`
const StyledLi = styled.li`
    list-style-type: none;
    font-size: 1.5rem;
    margin: 1rem 0;

    &:hover {
        transform: scale(1.5) translate(15px);
    }
`

export default function Menus(props) {
    const {
        siteMetadata,
    } = useSiteMetadata();
    const {
        menus,
    } = siteMetadata;

    return (
        <>
            <StyledUl>
                {
                    menus.map((menu) => {
                        return (
                            <StyledLi key={`Menu-${menu.path}`}>
                                <Link to={menu.path}>
                                    {menu.label}
                                </Link>
                            </StyledLi>
                        );
                    })
                }
            </StyledUl>
        </>
    )

}