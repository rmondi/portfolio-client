import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

export default function Seo({ data }) {

  const title = data !== null ? data.metaTitle : process.env.NEXT_PUBLIC_SEO_DEFAULT_TITLE;
  const description = data !== null ? data.metaDescription : process.env.NEXT_PUBLIC_SEO_DEFAULT_DESCRIPTION;
    
  const router = useRouter();
  const url = `${ process.env.NEXT_PUBLIC_CLIENT_URL }${ router.asPath }`;
  
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={ description } />
        <link rel="canonical" href={ url } />
        <link rel="icon" type="image/png" href="./favicon.png" />
        {
          (data !== null && data.metaSocial) &&
          <>
           {
            data.metaSocial.map(social => {
              if (social.socialNetwork === "Twitter") {
                return [
                  <meta key={ uuidv4() } name="twitter:card" content="summary" />,
                  <meta key={ uuidv4() } name="twitter:site" content={ url } />,
                  <meta key={ uuidv4() } name="twitter:title" content={ social.title } />,
                  <meta key={ uuidv4() } name="twitter:description" content={ social.description } />,
                  <meta key={ uuidv4() } name="twitter:image" content={ `${ process.env.NEXT_PUBLIC_API_URL }${ social.image.data.attributes.url }` } />
                ]
              }

              if (social.socialNetwork === "Facebook") {
                return [
                  <meta key={ uuidv4() } property="og:url" content={ url } />,
                  <meta key={ uuidv4() } property="og:type" content="website" />,
                  <meta key={ uuidv4() } property="og:title" content={ social.title } />,
                  <meta key={ uuidv4() } property="og:description" content={ social.description } />,
                  <meta key={ uuidv4() } property="og:image" content={ `${ process.env.NEXT_PUBLIC_API_URL }${ social.image.data.attributes.url }` } />
                ]
              }
            })
           }
          </>
        }
      </Head>
    </>
  )
}
