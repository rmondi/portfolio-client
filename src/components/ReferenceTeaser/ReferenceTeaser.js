import React from "react";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

import { Tags, Tag } from "@/components/Tags/Tags";

import styles from "./ReferenceTeaser.module.scss";

export default function ReferenceTeaser({ data }) {

  return (
    <div className={ styles.reference }>
      <Link className={ styles.reference__link } href={ `/references/${data.slug}` }>
        <div className={ styles.reference__container }>
          <div className={ styles.reference__header }>
            <div className={ styles.reference__visual }>
              <Image
                className={ styles.reference__image }
                width={ data.screenshot.data.attributes.formats.reference.width }
                height={ data.screenshot.data.attributes.formats.reference.height }
                alt={ data.name }
                src={ `${process.env.NEXT_PUBLIC_API_URL}${data.screenshot.data.attributes.formats.reference.url}` }
              />
            </div>
          </div>
          <div className={ styles.reference__body }>
            <h2 className={ styles.reference__title }>
              { data.name }
            </h2>
            <h3 className={ styles.reference__experience }>
              { data.experience.data.attributes.name }
              {
                (data?.year && data.year !== null) &&
                <span className={ styles.reference__year }>({ data.year })</span>
              }
            </h3>
            <div className={ styles.reference__skills }>
              <Tags>
                {
                  data.skills.data.map(skill => {
                    return <Tag key={ uuidv4() } label={ skill.attributes.name } />
                  })
                }
              </Tags>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
