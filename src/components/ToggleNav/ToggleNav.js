import React from "react";

import styles from "./ToggleNav.module.scss";

export default function ToggleNav({ active }) {
  
  return (
    <div className={ styles.togglenav }>
      <div
        className={ `${ styles.togglenav__wrapper } ${ active ? styles.active : "" }` }
      >
        <span></span>
      </div>
    </div>
  )
}
