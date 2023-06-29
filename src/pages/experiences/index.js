import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";

import { getGraphQLFetch } from "@/tools/Fetch/Fetch";
import Seo from "@/components/Seo/Seo";
import Section from "@/components/Section/Section";
import PageHeader from "@/components/PageHeader/PageHeader";
import ExperienceTeaser from "@/components/ExperienceTeaser/ExperienceTeaser";

import styles from "./Experiences.module.scss";

export default function Experiences({ data, experiences }) {

  const {
    header,
    seo
  } = data.attributes;

  const handleInView = (inView, entry) => {
    if (inView) entry.target.classList.add("reveal-visible")
    else entry.target.classList.remove("reveal-visible")
  };

  const inViewOptions = {
    threshold: 0,
    triggerOnce: true,
    onChange: handleInView
  }

  const { ref : refBody } = useInView(inViewOptions);
  
  return (
    <>
      <Seo data={ seo } />
      <div className={ styles.experiences }>
        <Section>
          <PageHeader
            title={ header.title }
            introduction={ header.introduction }
          />
        </Section>
        <Section>
          <div
            ref={ refBody }
            className={ `${ styles.experiences__body } reveal reveal--up reveal-visible-5` }
          >
            {
              experiences.length > 0 ?
              <div className={ styles.experiences__list }>
                {
                  experiences.map(experience => {

                    return (
                      <div className={ styles.experiences__item } key={ uuidv4() }>
                        <ExperienceTeaser data={ experience.attributes } />
                      </div>
                    )
                  })
                }
              </div>
              :
              <p>{ "Oups, il n'y a aucun résultat..." }</p>
            }
          </div>
        </Section>
      </div>
    </>
  )
}

export const getStaticProps = async () => {

  const query = `
    query {
      experiencesPage {
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

  const queries = `
    query {
      experiences (sort: "startDate:desc") {
        data {
          attributes {
            name
            slug
            startDate
            endDate
            description
            logo {
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
  `;

  const results = await getGraphQLFetch(queries);

  return {
    props: {
      data: result.data.experiencesPage.data,
      experiences: results.data.experiences.data
    }
  }
};