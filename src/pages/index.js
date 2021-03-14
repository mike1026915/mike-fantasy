import React from 'react';

import resume from '../data/profile';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Header from '../components/resume/Header';

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
    </Layout>
  );
}
