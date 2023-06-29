import React from "react";

import styles from "./Level.module.scss";

export default function Level({ level }) {
  
  return (
    <div className={ styles.level }>
      <span className={ styles.level__label }>Niveau</span>
      <ul className={ `${ styles.level__list } ${ styles[level] }` }>
        <span className={ styles.level__item }></span>
        <span className={ styles.level__item }></span>
        <span className={ styles.level__item }></span>
      </ul>
    </div>
  )
}
