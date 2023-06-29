import React from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";

import { getGraphQLFetch } from "@/tools/Fetch/Fetch";
import Seo from "@/components/Seo/Seo";
import Section from "@/components/Section/Section";
import Title from "@/components/Title/Title";
import Dates from "@/components/Dates/Dates";
import Paragraph from "@/components/Paragraph/Paragraph";
import { Tags, Tag } from "@/components/Tags/Tags";
import ReferencesList from "@/components/ReferencesList/ReferencesList";

import styles from "./Experience.module.scss";

export default function Experience({ experience }) {

  const {
    name,
    slug,
    startDate,
    endDate,
    website,
    description,
    logo,
    references,
    skills,
    seo
  } = experience.attributes;

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
        <div className={ styles.experience__container }>
          <div
            ref={ refLogo }
            className={ `${ styles.experience__logo } reveal reveal--up reveal-visible-1` }
          >
            <Image
              width={ logo.data.attributes.width }
              height={ logo.data.attributes.height }
              src={ `${ process.env.NEXT_PUBLIC_API_URL }${ logo.data.attributes.url }` }
              alt={ name }
            />
          </div>
          <div
            ref={ refContent }
            className={ `${ styles.experience__content } reveal reveal--right reveal-visible-2` }
          >
            <div className={ styles.experience__dates }>
              <Dates startDate={ startDate } endDate={ endDate } />
            </div>
            <div className={ styles.experience__link }>
              Site : 
              <a
                target="_blank"
                href={ website }
                title={ `Site Internet de ${ name }` }
              >
                { website }
              </a>
            </div>
            <div className={ styles.experience__description }>
              <Paragraph>
                { description }
              </Paragraph>
            </div>
            <div className={ styles.experience__skills }>
              <Tags>
                {
                  skills.data.map(skill => {
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
          </div>
        </div>
      </Section>
      {
        references.data.length > 0 &&
        <ReferencesList
          title={ `Mes références chez ${ name }` }
          references={ references.data }
        />
      }
    </>
  )
}

export const getStaticProps = async ({ params }) => {

  const query = `
    query ($slug: String!) {
      experiences(filters: {slug: {eq: $slug}}) {
        data {
          id
          attributes {
            name
            slug
            startDate
            endDate
            website
            description
            references {
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
            skills {
              data {
                attributes {
                  name,
                  slug
                }
              }
            }
            logo {
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
      experience: result.data.experiences.data[0]
    }
  }
};

export const getStaticPaths =  async () => {

  const query = `
    query {
      experiences {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `;

  const results = await getGraphQLFetch(query);

  const paths = results.data.experiences.data.map(result => {
    return { params: { slug: result.attributes.slug }};
  });

  return {
    paths,
    fallback: false
  }
};