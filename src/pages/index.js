import React from 'react';
import styled from 'styled-components';

import resume from '../data/profile';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Header from '../components/resume/Header';
import Summary from '../components/resume/Summary';
import Skills from '../components/resume/Skills';

const StyledMain = styled.main`
    display: flex;
    flex-direction: row;

    .left {
        width: 66.67%;
        min-height: 100px;
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
          <div className="left" />
          <Skills
              skills={resume.skills}
          />
      </StyledMain>
    </Layout>
  );
}
