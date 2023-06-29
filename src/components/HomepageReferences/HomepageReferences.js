import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";

import Background from "@/components/Background/Background";
import Title from "@/components/Title/Title";
import ReferenceTeaser from "@/components/ReferenceTeaser/ReferenceTeaser";
import useViewport from "@/tools/Viewport/Viewport";

import '@splidejs/react-splide/css';
import variables from "@/styles/Variables.module.scss";
import styles from "./HomepageReferences.module.scss";

export default function HomepageReferences({ title, references }) {

  const handleInView = (inView, entry) => {
    if (inView) entry.target.classList.add("reveal-visible")
    else entry.target.classList.remove("reveal-visible")
  };

  const inViewOptions = {
    threshold: .5,
    triggerOnce: true,
    onChange: handleInView
  };

  const { ref: refRef } = useInView(inViewOptions);
  const { ref: refRefHeader } = useInView(inViewOptions);
  const { ref: refRefBody } = useInView(inViewOptions);

  const viewport = useViewport()
  const [ bgStyles, setBgStyles ] = useState({})

  useEffect(() => {
    let styles = { backgroundColor: variables.blueLight }

    switch(viewport.device) {
      case 'xs':
      case 'sm':
      default:
        styles = { ...styles, top: '50%', bottom: 0, left: '20%', width: "100vw" }
        break
      case 'md':
      case 'lg':
        styles = { ...styles, top: 0, bottom: "30%", left: 0, width: '33.3333%' }
    }

    setBgStyles(styles)

  }, [ viewport ])

  return (
    <div
      ref={ refRef }
      className={ `${ styles.references } reveal reveal--up` }
    >
      <Background bgStyles={ bgStyles } />
      <div className={ styles.references__container }>
        <div
          ref={ refRefHeader }
          className={ `${ styles.references__header } reveal reveal--right reveal-visible-3` }
        >
          <Title level="2">{ title }</Title>
        </div>
        <div
          ref={ refRefBody }
          className={ `${ styles.references__body } reveal reveal--left reveal-visible-6` }
        >
          <div className={ styles.references__slider }>
            <Splide
              hasTrack={ false }
              options={
                {
                  type: "loop",
                  padding: 15,
                  gap: 15,
                  autoplay: true,
                  interval: 3000,
                  autoHeight: true,
                  pagination: false,
                  perPage: 1,
                  perMove: 1,
                  mediaQuery: "min",
                  breakpoints: {
                    768: {
                      perPage: 2
                    },
                    1100: {
                      perPage: 3,
                      padding: 0,
                      gap: 20
                    }
                  }
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
              <SplideTrack className={ styles.slidetrack }>
                {
                  references.map(reference => {
                    return (
                      <SplideSlide className={ styles.slide } key={ uuidv4() }>
                        <ReferenceTeaser data={ reference.attributes } />
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
