import React from 'react';
import styled from 'styled-components';

import { MdMail } from "react-icons/md";
import { MdWeb } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: 0.2rem solid var(--light-green);
    padding-bottom: 1rem;
`
const Name = styled.h1`
    margin-bottom: 1rem;
`

const Title = styled.h3`
`

const Left = styled.div`
    width: 66.67%;
`

const Right = styled.div`

    @media (min-width: 125vh) {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-items: space-between;
        border-left: 0.2rem solid var(--light-green);
        padding-left: 1.5rem;
        padding-bottom: 1rem;

        a {
            font-size: 1.5rem;
            margin-left: 1.5rem;
        }
    }

    @media (max-width: 125vh) {
        display: none;
        border-left: none;
    }


`

const LINKED_IN_ICON = (
    <svg
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        stroke="currentcolor"
        fill="currentcolor"
    >
        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
    </svg>
)

const CONTACT_ICON = {
    linkedin: LINKED_IN_ICON,
    email: (<MdMail />),
    website: (<MdWeb />),
    location: (<MdLocationOn />),
}

const ContactItem = styled.div`
    display: flex;
`

const Header = (props) => {
    const {
        name,
        chineseName,
        title,
        contacts
    } = props;

    const contactItems = Object.keys(contacts).map((key) => {
        return (
            <ContactItem
                key={key}>
                {CONTACT_ICON[key]}
                &nbsp;
                <a
                    href={contacts[key].link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {contacts[key].text}
                </a>
            </ContactItem>
        )
    });

    return (
        <StyledHeader>
            <Left>
                <Name>
                    {chineseName} {name}
                </Name>
                <Title>
                    {title}
                </Title>
            </Left>
            <Right>
                {contactItems}
            </Right>
        </StyledHeader>
    );
};

export default Header;
