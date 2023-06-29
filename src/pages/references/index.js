import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";

import { getGraphQLFetch } from "@/tools/Fetch/Fetch";
import Seo from "@/components/Seo/Seo";
import Section from "@/components/Section/Section";
import PageHeader from "@/components/PageHeader/PageHeader";
import { Grid, GridItem } from "@/components/Grid/Grid";
import ReferenceTeaser from "@/components/ReferenceTeaser/ReferenceTeaser";
import Pager from "@/components/Pager/Pager";

import styles from "./References.module.scss";

export default function References({ data }) {

  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ references, setReferences ] = useState([]);
  const [ meta, setMeta ] = useState({});
  const [ page, setPage ] = useState(1);

  const {
    header,
    seo
  } = data.attributes;

  const handlePager = (newPage) => setPage(newPage);

  const handleInView = (inView, entry) => {
    if (inView) entry.target.classList.add("reveal-visible")
    else entry.target.classList.remove("reveal-visible")
  };

  const inViewOptions = {
    threshold: 0,
    triggerOnce: true,
    onChange: handleInView
  }

  const { ref : refContainer } = useInView(inViewOptions);
  const { ref : refBody } = useInView(inViewOptions);

  useEffect(() => {

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const query = `
      query References($page: Int!) {
        references(sort: "year:desc" , pagination: {page: $page, pageSize: 8}) {
          data {
            attributes {
              name
              slug
              year
              experience {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              skills {
                data {
                  attributes {
                    name
                    slug
                  }
                }
              }
              screenshot {
                data {
                  attributes {
                    formats
                  }
                }
              }
            }
          }
          meta {
            pagination {
              page,
              pageSize,
              pageCount,
              total
            }
          }
        }
      }
    `;

    fetch(process.env.NEXT_PUBLIC_API_HOST, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ query: query, variables: {"page": parseInt(page)}})
    })
    .then(response => response.json())
    .then(results => {
      setReferences(results.data.references.data);
      setMeta(results.data.references.meta);
      setIsLoaded(true);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    })
    .catch(error => console.error(error));
  }, [page])
  
  return (
    <>
      <Seo data={ seo } />
      <div
        ref={ refContainer }
        className={ `${ styles.references } reveal reveal--up` }
      >
        <Section>
          <PageHeader
            title={ header.title }
            introduction={ header.introduction }
          />
        </Section>
        {
          isLoaded &&
          <>
            <Section>
              <div
                ref={ refBody }
                className={ `${ styles.references__body } reveal reveal--up reveal-visible-8` }
              >
                {
                  references.length > 0 ?
                  <Grid>
                    {
                      references.map(reference => {

                        return (
                          <GridItem key={ uuidv4() }>
                            <ReferenceTeaser data={ reference.attributes } />
                          </GridItem>
                        )
                      })
                    }
                  </Grid>
                  :
                  <p>{ "Oups, il n'y a aucun résultat..." }</p>
                }
              </div>
            </Section>
            {
              meta.pagination.pageCount > 1 &&
              <Section>
                <div className={ styles.references__pager }>
                  <Pager pagination={ meta.pagination } onPageSelect={ handlePager } />
                </div>
              </Section>
            }
          </>
        }
      </div>
    </>
  )
}

export const getStaticProps = async () => {

  const query = `
    query {
      referencesPage {
        data {
          attributes {
            header {
              title
              introduction
            }
            seo {
              metaTitle
              metaDescription
              metaImage {
                data {
                  attributes {
                    url
                    width
                    height
                  }
                }
              }
              metaSocial {
                socialNetwork
                title
                description
                image {
                  data {
                    attributes {
                      url
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const result = await getGraphQLFetch(query);

  return {
    props: {
      data: result.data.referencesPage.data
    }
  }
}; 