import React from "react";
import { getGraphQLFetch } from "@/tools/Fetch/Fetch";
import Seo from "@/components/Seo/Seo";
import Section from "@/components/Section/Section";
import HomepageAbout from "@/components/HomepageAbout/HomepageAbout";
import HomepageSkills from "@/components/HomepageSkills/HomepageSkills";
import HomepageReferences from "@/components/HomepageReferences/HomepageReferences";
import HomepageExperiences from "@/components/HomepageExperiences/HomepageExperiences";

export default function Home({ data }) {

  const { About: about, Skills: skills, References: references, Experience: experience, seo } = data;

  return (
    <>
    <Seo data={ seo } />
    <Section id="about">
      <HomepageAbout
        title={[`${about.firstname} ${about.lastname}`, about.job]}
        text={ about.description }
        image={ about.photo.data.attributes.formats.about }
      />
    </Section>
    <Section id="skills">
      <HomepageSkills
        title={skills.title}
        description={skills.description}
        skills={skills.skills.data}
      />
    </Section>
    <Section id="references">
      <HomepageReferences
        title={ references.title }
        references={ references.references.data }
      />
    </Section>
    <Section id="experience">
      <HomepageExperiences
        title={ experience.title }
        experiences={ experience.experiences.data }
      />
    </Section>
    </>
  )
}

export async function getStaticProps() {

  const query = `
    query {
      homepage {
        data {
          attributes {
            About {
              firstname
              lastname
              job
              description
              photo {
                data {
                  attributes {
                    formats
                  }
                }
              }
            }
            Skills {
              title
              description
              skills {
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
            }
            References {
              title
              references(sort: "year:desc") {
                data {
                  attributes {
                    name
                    slug
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
            }
            Experience {
              title
              experiences(sort: "startDate:desc") {
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
                      height
                      width
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
    props : {
      data: result.data.homepage.data.attributes
    }
  }
}