import React from 'react';
import styled from 'styled-components';

import resume from '../data/profile';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Header from '../components/resume/Header';
import Summary from '../components/resume/Summary';
import Skills from '../components/resume/Skills';
import Hobby from '../components/resume/Hobby';
import Experience from '../components/resume/Experience';
import Education from '../components/resume/Education';

import { RESPONSIVE_BOUNDARY } from '../constants/constants';

const StyledMain = styled.main`
    display: flex;

    @media (min-width: ${RESPONSIVE_BOUNDARY}) {
        flex-direction: row;

        .left {
            width: 66.67%;
            min-height: 100px;
            padding: 1.5rem 3.1rem 0 0;
        }

        .right {
            width: 33.33%;
            min-height: 100px;
            border-left: 0.2rem solid var(--light-green);
            padding: 1.5rem 0 0 2.5rem;
        }
    }

    @media (max-width: ${RESPONSIVE_BOUNDARY}) {
        flex-direction: column;

        .left, .right {
            width: 100%;
            min-height: 100px;
            padding: 1.5rem 3.1rem 0 0;
        }
    }

`;

export default function IndexPage() {
    return (
        <Layout>
            <SEO
                subTitle="Profile"
                ogType="profile"
            />
            <Header
                name={resume.name}
                chineseName={resume.chineseName}
                title={resume.title}
                contacts={resume.contacts}
            />
            <Summary
                summary={resume.summary}
            />
            <StyledMain>
                <div className="left">
                    <Experience
                        experience={resume.experience}
                    />
                    <Education
                        education={resume.education}
                    />
                </div>
                <div className="right">
                    <Skills
                        skills={resume.skills}
                    />
                    <Hobby
                        hobby={resume.hobby}
                    />
                </div>
            </StyledMain>
        </Layout>
    );
}
