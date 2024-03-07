import React from 'react';
import Helmet from 'react-helmet';

const BlabzioSeo = ({ title, image }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="Blabzio/Chat/Share/Connect" />
      <meta name="image" content={image} />

      {/* Facebook sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content="Blabzio /A SocialMedia Platform  like no other " />
      <meta property="og:image" content={image} />
      <meta property="og:url" content="Blabzio.com" />

      {/* Twitter sharing */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content="Blabzio /A SocialMedia Platform  like no other" />

      
<meta
 
name="twitter:image"
 
content={image} />

      
<meta
 
name="twitter:card"
 
content={image} />

    
</Helmet>
  );
};

export
 
default BlabzioSeo;