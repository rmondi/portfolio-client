import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";

import { getGraphQLFetch } from "@/tools/Fetch/Fetch";
import Seo from "@/components/Seo/Seo";
import Section from "@/components/Section/Section";
import PageHeader from "@/components/PageHeader/PageHeader";
import SkillTeaser from "@/components/SkillTeaser/SkillTeaser";

import styles from "./Skills.module.scss";

export default function Skills({ data }) {
  const {
    header,
    skills,
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

  const { ref: refBody } = useInView(inViewOptions);
  
  return (
    <>
      <Seo data={ seo } />
      <div className={ styles.skills }>
        <Section>
          <PageHeader
            title={ header.title }
            introduction={ header.introduction }
          />
        </Section>
        <Section>
          <div
            ref={ refBody }
            className={ `${ styles.skills__body } reveal reveal--up reveal-visible-5` }
          >
            {
              skills.data.length > 0 ?
              <div className={ styles.skills__list }>
                {
                  skills.data.map(skill => {
                    const { name, slug, icon } = skill.attributes;

                    return (
                      <div className={ styles.skills__item } key={ uuidv4() }>
                        <SkillTeaser
                          name={ name }
                          slug={ slug }
                          icon={ icon.data.attributes }
                        />
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
      skillsPage {
        data {
          attributes {
            header {
              title
              introduction
            }
            skills (pagination: {start: 0, limit: -1}) {
              data {
                attributes {
                  name
                  slug
                  icon {
                    data {
                      attributes {
                        url,
                        width,
                        height
                      }
                    }
                  }
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

  const results = await getGraphQLFetch(query);

  return {
    props: {
      data: results.data.skillsPage.data
    }
  }
};