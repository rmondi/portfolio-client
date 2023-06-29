import React from "react";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";

import { getGraphQLFetch } from "@/tools/Fetch/Fetch";
import Seo from "@/components/Seo/Seo";
import Section from "@/components/Section/Section";
import Title from "@/components/Title/Title";
import Paragraph from "@/components/Paragraph/Paragraph";
import { Tags, Tag } from "@/components/Tags/Tags";
import Button from "@/components/Button/Button";
import ReferencesList from "@/components/ReferencesList/ReferencesList";

import variables from "@/styles/Variables.module.scss";
import styles from "./References.module.scss";

export default function Reference({ data, references }) {

  const handleInView = (inView, entry) => {
    if (inView) entry.target.classList.add("reveal-visible")
    else entry.target.classList.remove("reveal-visible")
  };

  const inViewOptions = {
    threshold: 0,
    triggerOnce: true,
    onChange: handleInView
  }

  const { ref : refTitle } = useInView(inViewOptions);
  const { ref : refDesktop } = useInView(inViewOptions);
  const { ref : refMobile } = useInView(inViewOptions);
  const { ref : refContent } = useInView(inViewOptions);
  
  return (
    <>
      <Seo data={ data.seo } />
      <Section>
        <>
          <div
            ref={ refTitle }
            className="reveal reveal--right"
          >
            <Title level={ 1 }>{ data.name }</Title>
          </div>
          <div className={ styles.reference__container }>
            <div className={ styles.reference__visuals }>
              <div className={ styles.reference__visualsWrapper }>
                <div
                  ref={ refDesktop }
                  className={ `${ styles.reference__desktop } reveal reveal--right reveal-visible-1` }
                >
                  <div className={ styles.reference__wrapper }>
                    <Image
                      fill={ true }
                      sizes={`
                        (max-with: ${ variables.minWidthSm }) 100vw,
                        (max-with: ${ variables.minWidthMd }) 1000px,
                        840px
                      `}
                      src={ `${ process.env.NEXT_PUBLIC_API_URL }${ data.screenshot_desktop.data.attributes.url }` }
                      alt={ `${ data.name } - version desktop` }
                    />
                  </div>
                </div>
                <div
                  ref={ refMobile }
                  className={ `${ styles.reference__mobile } reveal reveal--left reveal-visible-2` }
                >
                  <div className={ styles.reference__wrapper }>
                    <Image
                      fill={ true }
                      sizes={ `
                        (max-width: ${ variables.minWidthSM }) 65px,
                        (max-width: ${ variables.minWidthMd }) 220px,
                        175px
                      ` }
                      src={ `${ process.env.NEXT_PUBLIC_API_URL }${ data.screenshot_mobile.data.attributes.url }` }
                      alt={ `${ data.name } - version mobile` }
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              ref={ refContent }
              className={ `${ styles.reference__content } reveal reveal--up reveal-visible-3` }
            >
              <div className={ styles.reference__infos }>
                <Link
                  className={ styles.reference__experience }
                  href={ `/experiences/${ data.experience.data.attributes.slug }` }
                >
                  { data.experience.data.attributes.name }
                </Link>
                <span className={ styles.reference__year }>
                  ({ data.year })
                </span>
              </div>
              <div className={ styles.reference__description }>
                <Paragraph>
                  { data.description }
                </Paragraph>
              </div>
              <ul className={ styles.reference__details }>
                {
                  data.details.map(detail => {
                    return (
                      <li
                        key={ uuidv4() }
                        className={ styles.reference__detail }
                      >
                        { detail.name }
                      </li>
                    )
                  })
                }
              </ul>
              <div className={ styles.reference__skills }>
                <Tags>
                  {
                    data.skills.data.map(skill => {
                      const { name, slug } = skill.attributes;
                      
                      return (
                        <Tag
                          key={ uuidv4() }
                          linkable={ true }
                          label={ name }
                          slug={ slug }
                        />
                      )
                    })
                  }
                </Tags>
              </div>
              <div className={ styles.reference__cta }>
                <Button
                  label="Visiter le site"
                  target="_blank"
                  href={ data.url }
                />
              </div>
            </div>
          </div>
        </>
      </Section>
      {
        references.length > 0 &&
        <ReferencesList title="Voir aussi" references={ references } />
      }
    </>
  )
}

export const getStaticProps = async ({ params }) => {

  const query = `
    query ($slug: String!) {
      references(filters: {slug: {eq: $slug}}) {
        data {
          id
          attributes {
            name
            year
            url
            description
            experience {
              data {
                attributes {
                  name,
                  slug
                }
              }
            }
            details {
              name
            }
            skills {
              data {
                attributes {
                  name,
                  slug
                }
              }
            }
            screenshot_desktop {
              data {
                attributes {
                  url
                  width
                  height
                }
              }
            }
            screenshot_mobile {
              data {
                attributes {
                  url
                  width
                  height
                }
              }
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

  const reference = await getGraphQLFetch(query, { "slug": params.slug });

  const queries = `
    query ($id: ID!) {
      references(filters: { id : {ne: $id} }, pagination: {page: 1, pageSize: 4}) {
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
      }
    }
  `;

  const references = await getGraphQLFetch(queries, { "id": parseInt(reference.data.references.data[0].id) });

  return {
    props: {
      data: reference.data.references.data[0].attributes,
      references: references.data.references.data
    }
  }
}

export const getStaticPaths = async () => {

  const query = `
    query {
      references (pagination: {start: 0, limit: -1}) {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `;

  const results = await getGraphQLFetch(query);

  const paths = results.data.references.data.map(result => {
    return { params: { slug: result.attributes.slug }};
  });

  return {
    paths,
    fallback: false
  }
}