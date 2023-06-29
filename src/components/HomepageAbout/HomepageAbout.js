import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useInView } from "react-intersection-observer";

import Background from "@/components/Background/Background";
import Title from "@/components/Title/Title";
import Paragraph from "@/components/Paragraph/Paragraph";
import useViewport from "@/tools/Viewport/Viewport";

import variables from "@/styles/Variables.module.scss";
import styles from "./HomepageAbout.module.scss";

export default function HomepageAbout({ title, text, image }) {

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
  const { ref : refVisual } = useInView(inViewOptions);
  const { ref : refText } = useInView(inViewOptions);

  const viewport = useViewport()
  const [ bgStyles, setBgStyles ] = useState({})

  useEffect(() => {
    let styles = { backgroundColor: variables.yellow }

    switch(viewport.device) {
      case 'xs':
      default:
        styles = { ...styles, top: 0, bottom: 0, left: '50%', width: '100vw', transform: 'translateX(-50%)' }
        break
      case 'sm':
        styles = { ...styles, top: 0, right: 0, bottom: 0, left: 0, width: 'auto' }
        break
      case 'md':
      case 'lg':
        styles = { ...styles, top: 0, right: 0, bottom: 0, left: 0, width: 'auto' }
    }

    setBgStyles(styles)

  }, [ viewport ])


  return (
    <header className={ styles.header }>
      <div className={ styles.header__wrapper }>
        <div
          ref={ refTitle }
          className={ `${ styles.header__title } reveal reveal--right reveal-visible-1` }
        >
          <Title level={ 1 }>
            {
              title.map((value, key) => {
                return <span key={ key }>{ value }</span>
              })
            }
          </Title>
        </div>
        <div
          ref={ refVisual }
          className={ `${styles.header__visual} reveal reveal--left reveal-visible-3` }
        >
          <Background bgStyles={ bgStyles } />
          <div className={ styles.header__visual__wrapper }>
            <div className={ `${styles.header__visual__slot} ${styles.slot__top}` }>
              <span></span>
            </div>
            <Image
              className={ styles.header__visual__image }
              alt={ title }
              src={ `${process.env.NEXT_PUBLIC_API_URL}${image.url}` }
              width={ image.width }
              height={ image.height }
            />
            <div className={ `${styles.header__visual__slot} ${styles.slot__bottom}` }>
              <span></span>
            </div>
          </div>
        </div>
        <div
          ref={ refText }
          className={ `${ styles.header__text } reveal reveal--up reveal-visible-6` }
        >
          <Paragraph>{ text }</Paragraph>
        </div>
      </div>
    </header>
  )
}