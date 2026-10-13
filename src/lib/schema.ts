import { siteConfig } from '../siteConfig';

export function buildPersonSchema(jobTitle: string, alternateName?: string) {
  const { name, siteUrl, description, contacts } = siteConfig;

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
