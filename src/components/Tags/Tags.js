import React from "react";
import Link from "next/link";

import styles from "./Tags.module.scss";

export function Tags({ children }) {
  
  return (
    <div className={ styles.tags }>
      <ul className={ styles.tags__list }>
        { children }
      </ul>
    </div>
  )
}

export function Tag({ label, linkable = false, slug = '' }) {

  return (
    <li className={ styles.tag }>
      {
        linkable
        ? <Link className={ styles.tag__link } href={ `/skills/${ slug }` }>{ label }</Link>
        : <span className={ styles.tag__label }>{ label }</span>
      }
    </li>
  )
}
