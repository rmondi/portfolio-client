import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";

import Section from "../Section/Section";
import Title from "../Title/Title";
import { Grid, GridItem } from "../Grid/Grid";
import ReferenceTeaser from "../ReferenceTeaser/ReferenceTeaser";

import styles from "./ReferencesList.module.scss";

export default function ReferencesList({ title, references }) {

  const handleInView = (inView, entry) => {
    if (inView) entry.target.classList.add("reveal-visible")
    else entry.target.classList.remove("reveal-visible")
  };

  const inViewOptions = {
    threshold: 0,
    triggerOnce: true,
    onChange: handleInView
  }

  const { ref : refSubtitle } = useInView(inViewOptions);
  const { ref : refSeeMore } = useInView(inViewOptions);
  
  return (
    <Section>
      <div
        ref= { refSubtitle }
        className={ `${ styles.referenceList__title } reveal reveal--right reveal-visible-4` }
      >
        <Title level={ 2 }>
          { title }
        </Title>
        <div className={ styles.referenceList__separator }></div>
      </div>
      <div
        ref={ refSeeMore }
        className={ `${ styles.referenceList__seeMore } reveal reveal--left reveal-visible-5` }
      >
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
      </div>
    </Section>  
  )
}
