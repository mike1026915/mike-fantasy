import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import useSiteMetadata from '../hooks/useSiteMetadata';


const StyledUl = styled.ul`
    padding: 0;
    margin: 0;
`
const StyledLi = styled.li`
    list-style-type: none;
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
                            <StyledLi>
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