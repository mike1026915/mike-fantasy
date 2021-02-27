import React from 'react';
import { Helmet } from 'react-helmet';
import useSiteMetadata from '../hooks/useSiteMetadata';


export default function SEO( {children, subTitle, location, ogType, image}){
    const {
        siteMetadata,
        preview,
    } = useSiteMetadata();
    const {
        title,
        description,
        siteUrl,
    } = siteMetadata;

    return (
        <Helmet titleTemplate={`%s - ${subTitle}`}>
            <html lang="en" />
            <title>{title}</title>
            {/** Fav Icons *
                <link rel="icon" type="image/png" href="/icon.svg" />
                <link rel="alternate icon" href="/favicon.ico" />
            */}

            {/** Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale-1.0" />
            <meta charSet="utf-8" />
            <meta name="description" content={description}/>

            {/** Open graph */}
            <meta property="og:url" content={location?.href || siteUrl}/>
            <meta property="og:type" content={ogType || 'website'} />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:image" content={image || `${siteUrl}${preview?.src}` || 'images/icon.png'} />
            <meta property="og:site_name" ontent={title} key="ogsitename" />
            <meta property="og:description" content={description} key="ogdesc"/>

            {/** Twitter Card */}
            <meta name="twitter:card" content={description} />
            <meta name="twitter:site" content="@mike1026915" />
            <meta name="twitter:creator" content="@mike1026915" />

            {children}
        </Helmet>
    );
}