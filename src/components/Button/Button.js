import React from "react";
import Link from "next/link";

import styles from "./Button.module.scss";

export default function Button({ label, href, target="_self" }) {
  
  return (
    <a
      className={ styles.button }
      target={ target }
      href={ href }
    >
      { label }
    </a>
  )
}
