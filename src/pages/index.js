import React from 'react';

import resume from '../data/profile';

import Layout from '../components/Layout';
import SEO, { buildPersonSchema } from '../components/SEO';
import useSiteMetadata from '../hooks/useSiteMetadata';
import Tag from '../components/Tag';
import TagList from '../components/TagList';
import SectionTitle from '../components/resume/SectionTitle';
import Hero from '../components/brand/Hero';
import ProofPoints from '../components/brand/ProofPoints';
import SelectedWork from '../components/brand/SelectedWork';
import ContactLine from '../components/brand/ContactLine';

export default function IndexPage() {
    const { brand } = resume;
    const { siteMetadata } = useSiteMetadata();

    return (
        <Layout>
            <SEO
                pathname="/"
                ogType="profile"
                jsonLd={buildPersonSchema({
                    siteMetadata,
                    jobTitle: brand.title,
                    alternateName: resume.chineseName,
                })}
            />
            <Hero
                name={resume.name}
                chineseName={resume.chineseName}
                title={brand.title}
                line={brand.line}
            />
            <ProofPoints
                proofPoints={brand.proofPoints}
            />
            <SelectedWork
                work={brand.selectedWork}
            />
            <SectionTitle
                text="What I Bring"
            />
            <TagList>
                {brand.signatureSkills.map((skill) => (
                    <Tag
                        key={skill}
                        value={skill}
                    />
                ))}
            </TagList>
            <ContactLine
                contacts={resume.contacts}
            />
        </Layout>
    );
}
