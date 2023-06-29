import React from "react";
import { useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";

import Title from "@/components/Title/Title";
import Paragraph from "@/components/Paragraph/Paragraph";
import SkillTeaser from "@/components/SkillTeaser/SkillTeaser";

import styles from "./HomepageSkills.module.scss";

export default function HomepageSkills({ title, description, skills }) {

  const handleInView = (inView, entry) => {
    if (inView) entry.target.classList.add("reveal-visible")
    else entry.target.classList.remove("reveal-visible")
  };

  const handleInViewItems = (inView, entry) => {
    if (inView) entry.target.classList.add("active")
    else entry.target.classList.remove("active")
  };

  const inViewOptions = {
    threshold: .5,
    triggerOnce: true,
    onChange: handleInView
  };

  const { ref: refSkills } = useInView(inViewOptions);
  const { ref: refHeader } = useInView(inViewOptions);
  const { ref: refBody } = useInView(inViewOptions);

  const { ref: refItems } = useInView({
    ...inViewOptions,
    onChange: handleInViewItems
  });

  return (
    <div
      ref={ refSkills }
      className={ `${ styles.skills } reveal reveal--up` }
    >
      <div className={ styles.skills__container }>
        <div
          ref={ refHeader }
          className={ `${ styles.skills__header } reveal reveal--up reveal-visible-6` }
        >
          <Title level="2">
            { title }
          </Title>
          {
            description !== null && <Paragraph>{ description }</Paragraph>
          }
        </div>
        <div
          ref={ refBody }
          className={ `${ styles.skills__body } reveal reveal--right reveal-visible-3` }
        >
          <div className={ styles.skills__wrapper }>
            <div
              ref={ refItems }
              className={ styles.skills__items }
              style={ {"--tp": `${skills.length - 1}`, "--tn": `-${skills.length - 1}`} }
            >
              {
                skills.map((skill, index) => {
                  const { name, slug, icon } = skill.attributes;

                  return (
                    <div
                      className={ styles.skills__item }
                      key={ index }
                      style={ {"--i": `${index}`} }
                    >
                      <SkillTeaser
                        classname={ styles.skill }
                        name={ name }
                        slug={ slug }
                        icon={ icon.data.attributes }
                      />
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
