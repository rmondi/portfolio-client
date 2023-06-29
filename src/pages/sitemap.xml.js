import React from "react";

import { getGraphQLFetch } from "@/tools/Fetch/Fetch";

function generateSiteMap( urls ) {
  const website = process.env.NEXT_PUBLIC_CLIENT_URL;

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${ website }</loc>
      </url>
      <url>
        <loc>${ website }/skills</loc>
      </url>
      <url>
        <loc>${ website }/references</loc>
      </url>
      <url>
        <loc>${ website }/experiences</loc>
      </url>
      ${
        urls.map(url => {
          return `
            <url>
              <loc>${url}</loc>
            </url>
          `;
        })
        .join('')
      }
   </urlset>
 `;
}

export default function Sitemap() {}

export const getServerSideProps = async ({ res }) => {

  const url = process.env.NEXT_PUBLIC_CLIENT_URL;

  const urls = [];

  const reference_query = `
    query {
      references {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `;

  const references = await getGraphQLFetch(reference_query);

  references.data.references.data.forEach(reference => {
    urls.push(`${ url }/references/${ reference.attributes.slug }`);
  });

  const sitemap = generateSiteMap(urls);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {}
  }
};