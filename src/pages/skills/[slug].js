import React from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";

import { getGraphQLFetch } from "@/tools/Fetch/Fetch";
import Seo from "@/components/Seo/Seo";
import Section from "@/components/Section/Section";
import Title from "@/components/Title/Title";
import Level from "@/components/Level/Level";
import ReferencesList from "@/components/ReferencesList/ReferencesList";

import styles from "./Skill.module.scss";

export default function Skill({ skill }) {

  const {
    name,
    slug,
    level,
    details,
    references,
    icon,
    seo
  } = skill.attributes;

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
  const { ref : refLogo } = useInView(inViewOptions);
  const { ref : refContent } = useInView(inViewOptions);
  
  return (
    <>
      <Seo data={ seo } />
      <Section>
        <div
          ref={ refTitle }
          className="reveal reveal--right"
        >
          <Title level={ 1 }>{ name }</Title>
        </div>
        <div className={ styles.skill__container }>
          <div
            ref={ refLogo }
            className={ `${ styles.skill__icon } reveal reveal--up reveal-visible-1` }
          >
            <Image
              style={ {  width: "auto", height: "auto" } }
              width={ icon.data.attributes.width }
              height={ icon.data.attributes.height }
              src={ `${ process.env.NEXT_PUBLIC_API_URL }${ icon.data.attributes.url }` }
              alt={ name }
            />
          </div>
          <div
            ref={ refContent }
            className={ `${ styles.skill__content } reveal reveal--right reveal-visible-2` }
          >
            <div className={ styles.skill__level }>
              <Level level={ level } />
            </div>
            {
              details.length > 0 &&
              <div className={ styles.skill__details }>
                <ul className={ styles.skill__list }>
                  {
                    details.map(detail => {
                      return (
                        <li
                          key={ uuidv4() }
                          className={ styles.skill__item }
                        >
                          { detail.name }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            }
          </div>
        </div>
      </Section>
      {
        references.data.length &&
        <ReferencesList
          title={ `Mes projets ${ name }` }
          references={ references.data }
        />
      }
    </>
  )
}

export const getStaticProps = async ({ params }) => {

  const query = `
    query ($slug: String!) {
      skills(filters: {slug: {eq: $slug}}) {
        data {
          attributes {
            name
            slug
            level
            details {
              name
            }
            references (sort: "year:desc") {
              data {
                attributes {
                  name
                  slug
                  year
                  screenshot {
                    data {
                      attributes {
                        formats
                      }
                    }
                  }
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
                }
              }
            }
            icon {
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

  const result = await getGraphQLFetch(query, { "slug": params.slug });

  return {
    props: {
      skill: result.data.skills.data[0]
    }
  }
};

export const getStaticPaths =  async () => {

  const query = `
    query {
      skills (pagination: {start: 0, limit: -1}) {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `;

  const results = await getGraphQLFetch(query);

  const paths = results.data.skills.data.map(result => {
    return { params: { slug: result.attributes.slug }};
  });

  return {
    paths,
    fallback: false
  }
};