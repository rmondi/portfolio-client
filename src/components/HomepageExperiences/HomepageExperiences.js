import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";

import Title from "@/components/Title/Title";
import ExperienceTeaser from "@/components/ExperienceTeaser/ExperienceTeaser";

import '@splidejs/react-splide/css';
import styles from "./HomepageExperiences.module.scss";

export default function HomepageExperiences({ title, experiences }) {

  const handleInView = (inView, entry) => {
    if (inView) entry.target.classList.add("reveal-visible")
    else entry.target.classList.remove("reveal-visible")
  };

  const inViewOptions = {
    threshold: .5,
    triggerOnce: true,
    onChange: handleInView
  };

  const { ref: refExp } = useInView(inViewOptions);
  const { ref: refExpHeader } = useInView(inViewOptions);
  const { ref: refExpBody } = useInView(inViewOptions);
  
  return (
    <div
      ref={ refExp }
      className={ `${ styles.experiences } reveal reveal--up` }
    >
      <div className={ styles.experiences__container }>
        <div
          ref={ refExpHeader }
          className={ `${ styles.experiences__header } reveal reveal--up reveal-visible-3` }
        >
          <Title level="2">
            { title }
          </Title>
        </div>
        <div
          ref={ refExpBody }
          className={ `${ styles.experiences__body } reveal reveal--up reveal-visible-6` }
        >
          <div className={ styles.experiences__slider }>
            <Splide
              className={ styles.slider }
              hasTrack={ false }
              options={
                {
                  type: "fade",
                  rewind: true,
                  autoplay: true,
                  interval: 3000,
                  autoHeight: true,
                  pagination: false,
                  perPage: 1,
                  perMove: 1
                }
              }
            >
              <div className={ `${ styles.arrows } splide__arrows` }>
                <button
                  className={ `${ styles.arrowPrev } splide__arrow splide__arrow--prev` }
                >
                </button>
                <button
                  className={ `${ styles.arrowNext } splide__arrow splide__arrow--next` }
                >
                </button>
              </div>
              <SplideTrack>
                {
                  experiences.map(experience => {
                    return (
                      <SplideSlide key={ uuidv4() }>
                        <ExperienceTeaser data={ experience.attributes } />
                      </SplideSlide>
                    )
                  })
                }
              </SplideTrack>
            </Splide>
          </div>
        </div>
      </div>
    </div>
  )
}
