import React from 'react';
import styled from 'styled-components';

import { MdMail } from "react-icons/md";
import { MdPhonelinkRing } from "react-icons/md";
import { MdWeb } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    border-bottom: solid;
    padding-bottom: 1rem;
`
const Name = styled.h1`
    margin-bottom: 1rem;
`

const Title = styled.h3`
`

const Left = styled.div`
    flex-grow: 2;
`

const Right = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-items: space-between;
    border-left: solid;
    padding-left: 1rem;

    a {
        font-size: 1.5rem;
        margin-left: 1.5rem;
    }

`
const CONTACT_ICON = {
    phone: (<MdPhonelinkRing />),
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
            <ContactItem>
                {CONTACT_ICON[key]}
                &nbsp;
                <a
                    key={key}
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
