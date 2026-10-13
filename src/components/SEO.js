import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';

export function buildPersonSchema({ siteMetadata, jobTitle, alternateName }) {
    const { name, siteUrl, description, contacts } = siteMetadata;

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name,
        alternateName,
        jobTitle,
        description,
        url: siteUrl,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Taipei',
            addressCountry: 'TW',
        },
        sameAs: [contacts.linkedin, contacts.github],
    };
}

/**
 * Per-page SEO tags.
 *
 * - `title`: page title. Omit on the home page to use the site title as is.
 * - `description`: falls back to the site description.
 * - `pathname`: used for the canonical and og:url, e.g. "/resume/".
 * - `image`: absolute URL; falls back to the site preview image.
 * - `jsonLd`: object or array of objects serialised as JSON-LD.
 */
export default function SEO({
    children,
    title,
    description,
    pathname = '/',
    ogType,
    image,
    jsonLd,
}) {
    const {
        siteMetadata,
        preview,
    } = useSiteMetadata();
    const {
        title: siteTitle,
        name,
        description: siteDescription,
        siteUrl,
    } = siteMetadata;

    const pageTitle = title ? `${title} | ${name}` : siteTitle;
    const pageDescription = description || siteDescription;
    const url = `${siteUrl}${pathname}`;
    const pageImage = image || (preview?.src ? `${siteUrl}${preview.src}` : undefined);

    return (
        <Helmet>
            <html lang="en" />
            <title>{pageTitle}</title>
            <link rel="canonical" href={url} />

            {/** Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="utf-8" />
            <meta name="description" content={pageDescription}/>

            {/** Open graph */}
            <meta property="og:url" content={url} />
            <meta property="og:type" content={ogType || 'website'} />
            <meta property="og:title" content={pageTitle} key="ogtitle" />
            {pageImage && <meta property="og:image" content={pageImage} />}
            <meta property="og:site_name" content={name} key="ogsitename" />
            <meta property="og:description" content={pageDescription} key="ogdesc"/>
            <meta property="og:locale" content="en_US" />

            {/** Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@mike1026915" />
            <meta name="twitter:creator" content="@mike1026915" />

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}

            {children}
        </Helmet>
    );
}
