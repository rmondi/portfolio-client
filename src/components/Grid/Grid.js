import React from "react";

import styles from "./Grid.module.scss";

export function Grid({ children }) {
  
  return (
    <div className={ styles.grid }>
      <div className={ styles.grid__items }>
        { children }
      </div>
    </div>
  )
}

export function GridItem({ children }) {

  return (
    <div className={ styles.gridItem }>
      { children }
    </div>
  )
} 
