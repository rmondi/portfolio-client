import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./SkillTeaser.module.scss";

export default function SkillTeaser({ classname, name, slug, icon }) {

  return (
    <div className={ `${styles.skill} ${ classname ? classname : "" }` }>
      <Link className={ styles.skill__link } href={ `/skills/${ slug }` }>
        <div className={ styles.skill__body }>
          <Image
            className={ styles.skill__icon }
            width={ icon.width }
            height={ icon.height }
            src={ `${process.env.NEXT_PUBLIC_API_URL}${icon.url}` }
            alt={ name }
          />
          <p className={ styles.skill__name }>
            { name }
          </p>
        </div>
      </Link>
    </div>
  )
}
