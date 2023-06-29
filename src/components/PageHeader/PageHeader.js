import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import Background from "@/components/Background/Background";
import useViewport from "@/tools/Viewport/Viewport";
import Title from "@/components/Title/Title";
import Paragraph from "@/components/Paragraph/Paragraph";

import variables from "@/styles/Variables.module.scss";
import styles from "./PageHeader.module.scss";

export default function PageHeader({ title, introduction }) {

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
  const { ref : refIntroduction } = useInView(inViewOptions);

  const viewport = useViewport();
  const [ bgStyles, setBgStyles ] = useState({});

  useEffect(() => {
    let styles = { backgroundColor: variables.yellow }

    switch(viewport.device) {
      case 'xs':
      default:
        styles = { ...styles, top: '-20px', bottom: '70%', left: '50%', width: '100vw', transform: 'translateX(-50%)' }
        break
      case 'sm':
        styles = { ...styles, top: '-30px', right: 0, bottom: '50%', left: 0, width: 'auto' }
        break
      case 'md':
        styles = { ...styles, top: '-40px', right: 0, bottom: '55%', left: '55%', width: 'auto' }
        break;
      case 'lg':
        styles = { ...styles, top: '-40px', right: 0, bottom: '55%', left: '55%', width: 'auto' }
    }

    setBgStyles(styles)

  }, [ viewport ])
  
  return (
    <header className={ styles.pageHeader }>
      <Background bgStyles={ bgStyles } />
      <div
          ref={ refTitle }
          className={ `${ styles.pageHeader__title } reveal reveal--right reveal-visible-3` }
        >
          <Title level={ 1 }>
            { title }
          </Title>
        </div>
        <div
          ref={ refIntroduction }
          className={ `${ styles.pageHeader__introduction } reveal reveal--right reveal-visible-6` }
        >
          <Paragraph>
            { introduction }
          </Paragraph>
        </div>
    </header>
  )
}
