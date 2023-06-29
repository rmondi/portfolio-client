import React from "react";
import Link from "next/link";
import Image from "next/image";

import Dates from "../Dates/Dates";
import Paragraph from "@/components/Paragraph/Paragraph";

import styles from "./ExperienceTeaser.module.scss";

export default function ExperienceTeaser({ data }) {
  
  return (
    <div className={ styles.experience }>
      <Link
        className={ styles.experience__link }
        href={ `/experiences/${ data.slug }` }
      >
        <div className={ styles.experience__container }>
          <div className={ styles.experience__image }>
            <Image
              className={ styles.experience__logo }
              width={ data.logo.data.attributes.width }
              height={ data.logo.data.attributes.height }
              src={ `${process.env.NEXT_PUBLIC_API_URL}${data.logo.data.attributes.url}` }
              alt=""
            />
          </div>
          <div className={ styles.experience__content }>
            <h3 className={ styles.experience__name }>
              { data.name }
            </h3>
            <div className={ styles.experience__dates }>
              <Dates startDate={ data.startDate } endDate={ data.endDate } />
            </div>
            <Paragraph classname={ styles.experience__description }>
              { data.description }
            </Paragraph>
          </div>
        </div>
      </Link>
    </div>
  )
}
